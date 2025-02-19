import SideNavigation from "./SideNavigation";
import DisplayProfile from "./DisplayProfile";
import { useParams } from "react-router";
import WhoToFollowSidebar from "./WhoToFollowSidebar";

export default function Profile() {
	const { profileId } = useParams();
	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
			<SideNavigation />
			<DisplayProfile profileId={profileId} />
			<WhoToFollowSidebar />
		</div>
	);
}
