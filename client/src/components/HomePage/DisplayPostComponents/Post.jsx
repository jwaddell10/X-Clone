import { useParams } from "react-router";
import useFetchPost from "../../../helpers/useFetchPost";
import PostReaction from "./PostReaction";
import ComposePost from "../ComposePost";
import Comments from "./Comments";
import useFetchComments from "../../../helpers/useFetchComments";
import SideNavigation from "../SideNavigation";
import WhoToFollowSidebar from "../WhoToFollowSidebar";
import { Link } from "react-router";

export default function Post() {
	const { username, postId } = useParams();
	const { post } = useFetchPost(username, postId);
	const { comments } = useFetchComments(postId);
	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
			<SideNavigation />
			<div
				style={{
					color: "white",
					width: "50vw",
					marginLeft: "5vw",
					marginRight: "5vw",
				}}
			>
				{post && (
					<div>
						<header className="post-header">
							<Link to={`/profile/${post.author.Profile.id}`}>
								<img
									src={post.author.Profile.profilePicture}
									alt=""
								/>
							</Link>

							<div>{username}</div>
						</header>

						<div className="post-text-contaiiner">{post.text}</div>
						<PostReaction post={post}></PostReaction>
						<ComposePost
							profileInfo={post.author.Profile}
						></ComposePost>
						<Comments post={post} comments={comments} />
					</div>
				)}
			</div>
			<WhoToFollowSidebar />
		</div>
	);
}
