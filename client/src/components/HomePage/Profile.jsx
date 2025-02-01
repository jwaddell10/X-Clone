import SideNavigation from "./SideNavigation";
import DisplayProfile from "./DisplayProfile";

export default function Profile() {

	return (
		<div style={{ display: "flex" }}>
			<SideNavigation />
			<DisplayProfile />
		</div>
	);
}
