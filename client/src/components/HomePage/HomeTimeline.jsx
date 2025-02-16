import ComposePost from "./ComposePost";
import AllPosts from "./DisplayPostComponents/AllPosts";

export default function HomeTimeline({
	profileInfo,
	refreshTrigger,
	setRefreshTrigger,
}) {
	return (
		<div className="post-container" style={{ display: "flex", flexDirection: "column" }}>
			<ComposePost
				profileInfo={profileInfo}
				refreshTrigger={refreshTrigger}
				setRefreshTrigger={setRefreshTrigger}
			/>
			<AllPosts refreshTrigger={refreshTrigger} />
		</div>
	);
}
