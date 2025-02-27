import { useEffect, useState } from "react";

export default function DisplayedUsers({ displayedUsers }) {
	const [isFollowing, setIsFollowing] = useState(null);
	const loggedInUserId = localStorage.getItem("id");

	useEffect(() => {
		if (displayedUsers) {
			const testvalue = displayedUsers.map((item) =>
				item.Profile.followedBy.some(
					(item) => item.followingId == loggedInUserId
				)
			);
			console.log(testvalue, "test value");
			setIsFollowing([true]);
		}
	}, [displayedUsers, loggedInUserId]);

	const toggleFollow = (event, userId) => {
		console.log(userId, "userid");
		// handleFollow(event, userId, triggerRefresh);
	};
	return (
		<>
			{displayedUsers?.map((user) => (
				<ul key={user.id} className="user-sidebar">
					<li className="user-name" style={{ color: "white" }}>
						{user.name}
					</li>
					<button>{isFollowing ? "Unfollow" : "Follow"}</button>
				</ul>
			))}
		</>
	);
}

// {displayedUsers?.map((user) => (
//     <ul key={user.id} className="user-sidebar">
//         <li className="user-name" style={{ color: "white" }}>
//             {user.name}
//         </li>
//         <button onClick={(event) => toggleFollow(event, user)}>
//             {console.log(isFollowing, "is following")}

//             {/* {isFollowing ? "Unfollow" : "follow"} */}
//         </button>
//     </ul>
// ))}
