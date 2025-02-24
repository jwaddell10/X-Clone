import ComposePost from "./ComposePost";
import TimelinePosts from "./DisplayPostComponents/TimelinePosts";

export default function HomeTimeline({
	profileInfo,
}) {
	return (
		<div className="post-container" style={{ display: "flex", flexDirection: "column" }}>
			<ComposePost
				profileInfo={profileInfo}
			/>
			<TimelinePosts />
		</div>
	);
}
