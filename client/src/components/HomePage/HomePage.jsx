import SideNavigation from "./SideNavigation";
import WhoToFollowSidebar from "./WhoToFollowSidebar";
import { useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import HomeTimeline from "./HomeTimeline";
import "../../Styles/HomePage.css";
import useGetLoggedInUserProfileInfo from "../../helpers/useGetLoggedInUserProfileInfo";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
	const { refreshTrigger } = useContext(RefreshContext);
	const { profileInfo, loading, error } =
		useGetLoggedInUserProfileInfo(refreshTrigger);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <div style={{ color: "white" }}>{error}</div>;
	}

	return (
		<main>
			<SideNavigation profileInfo={profileInfo} />
			<HomeTimeline profileInfo={profileInfo}></HomeTimeline>
			<WhoToFollowSidebar />
		</main>
	);
}
