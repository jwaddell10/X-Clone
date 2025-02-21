import EditProfile from "./EditProfile";
import "../.././Styles/DisplayProfile.css";
import useGetOtherUserProfileInfo from "../../helpers/useGetOtherUserProfileInfo.jsx";
import { useState } from "react";
import { styled } from "styled-components";
import UserProfilePosts from "./UserProfilePosts.jsx";

export default function DisplayProfile({ refreshTrigger, setRefreshTrigger, profileId }) {
	const loggedInUserId = localStorage.getItem("id");
	const [showEditForm, setShowEditForm] = useState(false);
	const { profileInfo, error } = useGetOtherUserProfileInfo(
		profileId,
		refreshTrigger,
	);

	// if (showEditForm) {
	// 	document.querySelector('.big-container').style.filter = 'blur(5px)'
	// }
	//working on follow feature
	const handleFollow = async (event, profileId) => {
		if (event.target.innerText === "Follow") {
			try {
				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/profile/${loggedInUserId}/${profileId}/follow`,
					{
						method: "POST",
					}
				);
				const data = await response.json();
				console.log(data, "data in response");
				setRefreshTrigger((prevState) => prevState + 1)
			} catch (error) {
				console.log(error, "error");
			}
		} else if (event.target.innerText === "Unfollow") {
			try {
				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/profile/${loggedInUserId}/${profileId}/unfollow`,
					{
						method: "DELETE",
					}
				);
				const data = await response.json();
				console.log(data, "data");
				setRefreshTrigger((prevState) => prevState + 1)

			} catch (error) {
				console.log(error, "error");
			}
		}
	};
	return (
		<StyledDiv>
			<div className="profile-container">	{profileInfo && (
				<div
					className="header-container"
					style={{borderBottom: "1px solid gray"}}
				>
					<div className="profile-picture">
						<img
						className="profile-picture-display-profile"
							style={{ width: "5rem" }}
							src={profileInfo.profilePicture}
							alt="profile-picture"
						/>
						{/* if user is logged in, show edit profile button, otherwise show follow button */}
						{profileInfo.id == loggedInUserId ? (
							<button
								className="edit-profile-button"
								onClick={() => setShowEditForm(true)}
							>
								Edit Profile
							</button>
						) : (
							<button
								onClick={(event) => {
									handleFollow(event, profileInfo.id);
								}}
							>
								{profileInfo.followedBy.map(
									(followData) => followData.followingId
								) == loggedInUserId
									? "Unfollow"
									: "Follow"}
							</button>
						)}

						{showEditForm && (
							<EditProfile
								setRefreshTrigger={setRefreshTrigger}
								profileInfo={profileInfo}
								onClose={() => {
									setShowEditForm(false);
								}}
							/>
						)}
					</div>
					<div className="username-container">
						<h1 className="username">{profileInfo.user.name}</h1>
						<div className="follower-container">
							<h1>{profileInfo.followedBy.length} Followers</h1>
							<h1>{profileInfo.following.length} Following</h1>
						</div>
					</div>
				</div>
			)}
			<UserProfilePosts profileId={profileId} />
			{error && <div style={{ color: "white" }}>{error.message}</div>}</div>
		
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	width: 45vw;
`;
