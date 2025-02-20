import { useParams } from "react-router";
import useFetchPost from "../../../helpers/useFetchPost";
import PostReaction from "./PostReaction";
import ComposePost from "../ComposePost";
import Comments from "./Comments";
import useFetchComments from "../../../helpers/useFetchComments";
import SideNavigation from "../SideNavigation";
import WhoToFollowSidebar from "../WhoToFollowSidebar";
import { Link } from "react-router";
import { styled } from "styled-components";

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
					width: "45vw",
					marginRight: "5vw",
				}}
			>
				{post && (
					<div
						style={{
							borderWidth: "1px 1px 0px 1px",
							borderStyle: "solid",
							borderColor: "gray",
						}}
					>
						<StyledHeader className="post-header">
							<Link to={`/profile/${post.author.Profile.id}`}>
								<img
									src={post.author.Profile.profilePicture}
									alt=""
									style={{
										width: "3vw",
										borderRadius: "20px",
									}}
								/>
							</Link>

							<div>{username}</div>
						</StyledHeader>

						<div className="post-text-contaiiner">{post.text}</div>
						<PostReaction post={post}></PostReaction>
						<ComposePost
							profileInfo={post.author.Profile}
							placeholderText={"Post your reply"}
						></ComposePost>
						<Comments post={post} comments={comments} />
					</div>
				)}
			</div>
			<WhoToFollowSidebar />
		</div>
	);
}

const StyledHeader = styled.header`
	display: flex;
`;
