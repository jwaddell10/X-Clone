import useGetProfileInfo from "../../helpers/useGetProfileInfo";
import EditProfile from "./EditProfile";
import "../.././Styles/DisplayProfile.css";
// import Button from "../../helpers/Button";
import { useState } from "react";

export default function DisplayProfile() {
	const [showEditForm, setShowEditForm] = useState(false);
	const { profileInfo, error } = useGetProfileInfo();
	// if (profileInfo) {
	// 	console.log(profileInfo.followedBy.length);
	// }

	//display followers/following
	//popup form when edit profile button is clicked
	return (
		<>
			{profileInfo && (
				<div
					className="header-container"
					style={{ border: "1px solid white" }}
				>
					<div className="profile-picture">
						<img
							style={{ width: "5rem" }}
							src={profileInfo.profilePicture}
							alt="profile-picture"
						/>
						<button
							className="edit-profile-button"
							onClick={() => setShowEditForm(true)}
						>
							Edit Profile
						</button>
						{showEditForm && (
							<EditProfile
								profilePicture={profileInfo.profilePicture}
								onClose={() => {
									setShowEditForm(false);
								}}
							/>
						)}
					</div>
					<div className="username-container">
						<h1 className="username">{profileInfo.user.name}</h1>
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
		</>
	);
}
