import { useEffect, useState } from "react";
import handleFollow from "../../helpers/handleFollow";
import { styled } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router";

export default function DisplayedUsers({ users }) {
	const [displayedUsers, setDisplayedUsers] = useState(null);
	const loggedInUserId = localStorage.getItem("id");

	const [followingStatusOfTop10users, setFollowingStatusOfTop10users] =
		useState(null);

	useEffect(() => {
		if (users) {
			const shuffledUsers = users
				.sort(() => 0.5 - Math.random())
				.slice(0, 10);
			setDisplayedUsers(shuffledUsers);
		}
	}, [users]);

	useEffect(() => {
		if (displayedUsers) {
			const followStatus = displayedUsers.map((item) =>
				item.Profile.followedBy.some(
					(item) => item.followingId == loggedInUserId
				)
			);
			setFollowingStatusOfTop10users(followStatus);
		}
	}, [displayedUsers, loggedInUserId]);

	const toggleFollow = async (event, userId, index) => {
		const updatedItems = [...followingStatusOfTop10users];
		updatedItems[index] = !followingStatusOfTop10users[index];
		setFollowingStatusOfTop10users(updatedItems);
		await handleFollow(event, userId);
	};

	return (
		<>
			{displayedUsers?.map((user, index) => (
				<ul key={user.id} className="user-sidebar">
					<Link to={`/profile/${user.Profile.id}`}
						style={{
							display: "grid",
							gridTemplateColumns: "40px 1fr 1fr",
							alignItems: "center",
							gap: "5px",
						}}
						className="profile-picture-and-username-container"
					>
						<StyledImage src={user.Profile.profilePicture} />
						<li className="user-name" style={{ color: "white" }}>
							{user.name}
						</li>
					</Link>

					{followingStatusOfTop10users && (
						<StyledButton
							onClick={(event) =>
								toggleFollow(event, user.id, index)
							}
						>
							{followingStatusOfTop10users[index] == true
								? "Unfollow"
								: "Follow"}
						</StyledButton>
					)}
				</ul>
			))}
		</>
	);
}

const StyledButton = styled.button`
	min-width: 6rem;
	border-radius: 20px;
	color: black;
	cursor: pointer;
	font-weight: bold;
`;

const StyledImage = styled.img`
	width: 40px;
`;

DisplayedUsers.propTypes = {
	users: PropTypes.object,
};
