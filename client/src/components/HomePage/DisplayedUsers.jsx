import { useEffect, useState, useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import handleFollow from "../../helpers/handleFollow";
import { styled } from "styled-components";

export default function DisplayedUsers({ users }) {
	const [displayedUsers, setDisplayedUsers] = useState(null);
	const loggedInUserId = localStorage.getItem("id");

	const [followingStatusOfTop10users, setFollowingStatusOfTop10users] =
		useState(null);
	const { triggerRefresh } = useContext(RefreshContext);

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
		triggerRefresh();
	};

	return (
		<>
			{displayedUsers?.map((user, index) => (
				<ul key={user.id} className="user-sidebar">
					<img src={user.Profile.profilePicture} />
					<li className="user-name" style={{ color: "white" }}>
						{user.name}
					</li>
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
	height: 5vh;
	width: 8vw;
	border-radius: 20px;
	color: black;
	cursor: pointer;
`;
