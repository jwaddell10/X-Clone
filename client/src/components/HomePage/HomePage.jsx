import ComposePostComponent from "./ComposePostComponent";
import SideNavigation from "./SideNavigation";
import WhoToFollowSidebar from "./WhoToFollowSidebar";
import useGetProfileInfo from "../../helpers/useGetProfileInfo";
import { useState } from "react";
import "../../Styles/HomePage.css"

export default function HomePage() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const { profileInfo } = useGetProfileInfo(refreshTrigger);

	return (
		<main>
			<SideNavigation profileInfo={profileInfo} />
			<ComposePostComponent
				profileInfo={profileInfo}
				refreshTrigger={refreshTrigger}
				setRefreshTrigger={setRefreshTrigger}
			/>
			<WhoToFollowSidebar />
		</main>
	);
}
