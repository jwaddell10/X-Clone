import ComposePost from "./ComposePost";
import MainPagePosts from "./DisplayPostComponents/MainPagePosts";

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
			<MainPagePosts refreshTrigger={refreshTrigger} />
		</div>
	);
}
