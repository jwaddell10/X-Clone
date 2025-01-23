import SideNavigation from "./SideNavigation";
import DisplayProfile from "./DisplayProfile";
// import EditProfile from "./EditProfile";

export default function Profile() {

	return (
		<div style={{ display: "flex" }}>
			<SideNavigation />
			<DisplayProfile />
		</div>
	);
}
