import SideNavigation from "./SideNavigation";
import DisplayProfile from "./DisplayProfile";
import { useParams } from "react-router";
import WhoToFollowSidebar from "./WhoToFollowSidebar";
import useGetLoggedInUserProfileInfo from "../../helpers/useGetOtherUserProfileInfo";
import { useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";

export default function Profile() {
	const {refreshTrigger } = useContext(RefreshContext)
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
				profileId={profileId}
			/>
			<WhoToFollowSidebar />
		</div>
	);
}
