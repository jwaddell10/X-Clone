import ComposePostComponent from "./ComposePostComponent";
import SideNavigation from "./SideNavigation";
import WhoToFollowSidebar from "./WhoToFollowSidebar";

export default function HomePage() {

	return (
		<>
			<SideNavigation />
			<ComposePostComponent />
			<WhoToFollowSidebar />
		</>
	);
}
