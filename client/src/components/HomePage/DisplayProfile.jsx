import EditProfile from "./EditProfile";
import "../.././Styles/DisplayProfile.css";
import useGetOtherUserProfileInfo from "../../helpers/useGetOtherUserProfileInfo.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext.jsx";
import { styled } from "styled-components";
import UserProfilePosts from "./UserProfilePosts.jsx";
import handleFollow from "../../helpers/handleFollow.jsx";
import PropTypes from "prop-types";

export default function DisplayProfile({ profileId }) {
	const { refreshTrigger, triggerRefresh } = useContext(RefreshContext);

	const loggedInUserId = localStorage.getItem("id");
	const [showEditForm, setShowEditForm] = useState(false);
	const { profileInfo, loading, error } = useGetOtherUserProfileInfo(
		profileId,
		refreshTrigger
	);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <div style={{ color: "white" }}>{error}</div>;
	}

	const toggleFollow = async (event, profileId) => {
		await handleFollow(event, profileId);
		triggerRefresh();
	};

	return (
		<StyledDiv>
			<div className="profile-container">
				{profileInfo && (
					<div
						className="header-container"
						style={{ borderBottom: "1px solid gray" }}
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
										toggleFollow(event, profileInfo.id);
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
									profileInfo={profileInfo}
									onClose={() => {
										setShowEditForm(false);
									}}
								/>
							)}
						</div>
						<div className="username-container">
							<h1 className="username">
								{profileInfo.user.name}
							</h1>
							<div className="follower-container">
								<h1>
									{profileInfo.followedBy.length} Followers
								</h1>
								<h1>
									{profileInfo.following.length} Following
								</h1>
							</div>
						</div>
					</div>
				)}
				<UserProfilePosts profileId={profileId} />
			</div>
		</StyledDiv>
	);
}

const breakpoints = {
	small: "500px",
	medium: "769px",
};

const StyledDiv = styled.div`
	width: 45vw;

	@media (max-width: ${breakpoints.medium}) {
		width: 75vw;
	}

	@media (max-width: ${breakpoints.small}) {
		width: 100vw;
	}
`;

DisplayProfile.propTypes = {
	profileId: PropTypes.number,
};
