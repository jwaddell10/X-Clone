import SideNavigation from "./SideNavigation";
import WhoToFollowSidebar from "./WhoToFollowSidebar";
import { useState } from "react";
import HomeTimeline from "./HomeTimeline";
import "../../Styles/HomePage.css";
import useGetLoggedInUserProfileInfo from "../../helpers/useGetLoggedInUserProfileInfo";

export default function HomePage() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const { profileInfo } = useGetLoggedInUserProfileInfo(refreshTrigger);

	return (
		<main>
			<SideNavigation profileInfo={profileInfo} />
			<HomeTimeline
				profileInfo={profileInfo}
				refreshTrigger={refreshTrigger}
				setRefreshTrigger={setRefreshTrigger}
			></HomeTimeline>
			<WhoToFollowSidebar />
		</main>
	);
}
