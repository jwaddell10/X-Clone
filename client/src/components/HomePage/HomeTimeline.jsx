import ComposePost from "./ComposePost";
import TimelinePosts from "./DisplayPostComponents/TimelinePosts";

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
			<TimelinePosts refreshTrigger={refreshTrigger} />
		</div>
	);
}
