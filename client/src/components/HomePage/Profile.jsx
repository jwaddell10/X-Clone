import useGetProfileInfo from "../../helpers/useGetProfileInfo";
import SideNavigation from "./SideNavigation";
import DisplayProfile from "./DisplayProfile";
import EditProfile from "./EditProfile";

export default function Profile() {
	const { profileInfo, error } = useGetProfileInfo();
	console.log(profileInfo, 'profile info')

	if (profileInfo) {
		console.log("profile exists");
	}
	return (
		<div style={{ display: "flex" }}>
			<SideNavigation />
			{profileInfo ? (
				<DisplayProfile />
			) : (
				<EditProfile />
			)}
			{error && <div style={{ color: "white" }}>{error}</div>}
		</div>
	);
}
