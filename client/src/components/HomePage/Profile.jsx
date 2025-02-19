import SideNavigation from "./SideNavigation";
import DisplayProfile from "./DisplayProfile";
import { useParams } from "react-router";

export default function Profile() {
	const { profileId } = useParams()
	return (
		<div style={{ display: "flex" }}>
			<SideNavigation />
			<DisplayProfile profileId={profileId}/>
		</div>
	);
}
