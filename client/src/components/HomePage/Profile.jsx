import SideNavigation from "./SideNavigation";
import DisplayProfile from "./DisplayProfile";
import { useParams } from "react-router";
import WhoToFollowSidebar from "./WhoToFollowSidebar";
import useGetLoggedInUserProfileInfo from "../../helpers/useGetOtherUserProfileInfo";
import { useState } from "react";

export default function Profile() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const { profileId } = useParams();
	const loggedInUserId = localStorage.getItem("id");
	const { profileInfo } = useGetLoggedInUserProfileInfo(
		loggedInUserId,
		refreshTrigger
	);
	return (
		<div className="big-container" style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr" }}>
			<SideNavigation profileInfo={profileInfo} />
			<DisplayProfile
				refreshTrigger={refreshTrigger}
				setRefreshTrigger={setRefreshTrigger}
				profileId={profileId}
			/>
			<WhoToFollowSidebar />
		</div>
	);
}
