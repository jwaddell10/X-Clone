import { useEffect, useState, useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import SearchBar from "./SearchBar";
import useFetchUsers from "../../helpers/useFetchUsers";
import "../../Styles/WhoToFollowSidebar.css";
import DisplayedUsers from "./DisplayedUsers";

export default function WhoToFollowSidebar() {
	const { refreshTrigger } = useContext(RefreshContext);

	const { users, isLoading, error } = useFetchUsers("user", refreshTrigger);
	return (
		<div className="who-to-follow-sidebar" style={{ marginRight: "7vw" }}>
			<SearchBar />
			<h1 style={{ color: "white" }}>Who to Follow</h1>
			<DisplayedUsers users={users} refreshTrigger={refreshTrigger}/>
		</div>
	);
}
