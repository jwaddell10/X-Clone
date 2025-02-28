import { useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import useFetchUsers from "../../helpers/useFetchUsers";
import "../../Styles/WhoToFollowSidebar.css";
import CircularProgress from "@mui/material/CircularProgress";
import DisplayedUsers from "./DisplayedUsers";

export default function WhoToFollowSidebar() {
	const { refreshTrigger } = useContext(RefreshContext);

	const { users, isLoading, error } = useFetchUsers("user", refreshTrigger);

	if (isLoading) {
		return <CircularProgress />;
	}

	if (error) {
		return <div style={{ color: "white" }}>{error}</div>;
	}
	
	return (
		<div className="who-to-follow-sidebar" style={{ marginRight: "7vw" }}>
			<h1 style={{ color: "white" }}>Who to Follow</h1>
			<DisplayedUsers users={users} />
		</div>
	);
}
