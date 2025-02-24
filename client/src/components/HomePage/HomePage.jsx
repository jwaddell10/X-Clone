import SideNavigation from "./SideNavigation";
import WhoToFollowSidebar from "./WhoToFollowSidebar";
import { useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import HomeTimeline from "./HomeTimeline";
import "../../Styles/HomePage.css";
import useGetLoggedInUserProfileInfo from "../../helpers/useGetLoggedInUserProfileInfo";

export default function HomePage() {
	const { refreshTrigger, triggerRefresh } = useContext(RefreshContext);
	const { profileInfo } = useGetLoggedInUserProfileInfo(refreshTrigger);

	return (
		<main>
			<SideNavigation profileInfo={profileInfo} />
			<HomeTimeline
				profileInfo={profileInfo}
			></HomeTimeline>
			<WhoToFollowSidebar />
		</main>
	);
}
