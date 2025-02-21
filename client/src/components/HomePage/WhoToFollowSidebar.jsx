import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Button from "../../helpers/Button";
import useFetchUsers from "../../helpers/useFetchUsers";
import "../../Styles/WhoToFollowSidebar.css";

export default function WhoToFollowSidebar() {
	//query users, display users with button
	const [displayedUsers, setDisplayedUsers] = useState(null);
	const { users, isLoading, error } = useFetchUsers("user");

	useEffect(() => {
		if (users) {
			const shuffledUsers = users
				.sort(() => 0.5 - Math.random())
				.slice(0, 10);
			setDisplayedUsers(shuffledUsers);
		}
	}, [users]);

	return (
		<div className="who-to-follow-sidebar" style={{marginRight: "7vw"}}>
			<SearchBar />
			<h1 style={{ color: "white" }}>Who to Follow</h1>
			{displayedUsers &&
				displayedUsers.map((user) => (
					<ul key={user.id} className="user-sidebar">
						<li className="user-name" style={{ color: "white" }}>
							{user.name}
						</li>
						<Button text="Follow" variant="postButton" />
					</ul>
				))}
		</div>
	);
}
