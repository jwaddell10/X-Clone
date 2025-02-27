import { useEffect, useState, useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import SearchBar from "./SearchBar";
import useFetchUsers from "../../helpers/useFetchUsers";
import "../../Styles/WhoToFollowSidebar.css";
import DisplayedUsers from "./DisplayedUsers";
import handleFollow from "../../helpers/handleFollow";

export default function WhoToFollowSidebar() {
	//query users, display users with button
	const [displayedUsers, setDisplayedUsers] = useState(null);
	// const [isFollowing, setIsFollowing] = useState(false);
	const loggedInUserId = localStorage.getItem("id");
	const { users, isLoading, error } = useFetchUsers("user");
	const { triggerRefresh } = useContext(RefreshContext);

	// if (displayedUsers) {
	// 	setIsFollowing(displayedUsers.map((user) => user.Profile.followedBy.followingId == loggedInUserId))
	// }
	// event, profileId, triggerRefresh
	// if (displayedUsers) {
	// 	setIsFollowing(displayedUsers.map((user) => user.Profile.followedBy.some((item) => item.followingId == loggedInUserId)))
	// }

	// if (displayedUsers) {
	// 	console.log(
	// 		displayedUsers.map((user) => user.Profile.followedBy),
	// 		"user"
	// 	);
	// }
	useEffect(() => {
		if (users) {
			const shuffledUsers = users
				.sort(() => 0.5 - Math.random())
				.slice(0, 10);
			// console.log(Object.values(isFollowing), 'is following values')
			setDisplayedUsers(shuffledUsers);
			// setIsFollowing(shuffledUsers.map((user) => user.Profile.followedBy.some((item) => item.followingId == loggedInUserId)))
		}
	}, [loggedInUserId, users]);
	//if user is following this users profile, then say Unfollow text, otherwise say Follow
	return (
		<div className="who-to-follow-sidebar" style={{ marginRight: "7vw" }}>
			<SearchBar />
			<h1 style={{ color: "white" }}>Who to Follow</h1>
			<DisplayedUsers displayedUsers={displayedUsers} />
		</div>
	);
}
