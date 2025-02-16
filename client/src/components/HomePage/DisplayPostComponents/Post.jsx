import { useParams } from "react-router";
import useFetchPost from "../../../helpers/useFetchPost";
import PostReaction from "./PostReaction";
import ComposePost from "../ComposePost";
import Comments from "./Comments";
import useFetchComments from "../../../helpers/useFetchComments";

export default function Post() {
	const { username, postId } = useParams();
	const { post } = useFetchPost(username, postId);
	const { comments } = useFetchComments(postId)
	return (
		<>
			<div style={{ color: "white" }}>
				{post && (
					<div>
						<header className="post-header">
							<img
								src={post.author.Profile.profilePicture}
								alt=""
							/>
							<div>{username}</div>
						</header>

						<div className="post-text-contaiiner">{post.text}</div>
						<PostReaction post={post}></PostReaction>
						<ComposePost
							profileInfo={post.author.Profile}
						></ComposePost>
						<Comments post={post} comments={comments}/>
					</div>
				)}
			</div>
		</>
	);
}
