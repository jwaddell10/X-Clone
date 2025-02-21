import useFetchPost from "../../../helpers/useFetchPost";
import PostReaction from "./PostReaction";
import Comments from "./Comments";
import useFetchComments from "../../../helpers/useFetchComments";
import { Link } from "react-router";
import { styled } from "styled-components";
import { useParams } from "react-router";
import SideNavigation from "../SideNavigation";
import WhoToFollowSidebar from "../WhoToFollowSidebar";
import ComposePost from "../ComposePost";
import useGetLoggedInUserProfileInfo from "../../../helpers/useGetLoggedInUserProfileInfo";

export default function PostDetails() {
	// Access URL parameters
	const { username, postId } = useParams();

	// Fetch post data
	const { post, loading, error } = useFetchPost(username, postId);

	// Fetch comments for the post
	const { comments } = useFetchComments(postId);

	const { profileInfo } = useGetLoggedInUserProfileInfo();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
			<SideNavigation />
			{post && (
				<StyledDiv>
					<StyledHeader className="post-header">
						<Link to={`/profile/${post.author.Profile.id}`}>
							<img
								src={post.author.Profile.profilePicture}
								alt="profile picture"
							/>
						</Link>
						<div>{username}</div>
						<div className="created-at">{post.createdAt}</div>
					</StyledHeader>

					<div className="post-text-container">{post.text}</div>
					<PostReaction post={post} />
					<ComposePost profileInfo={profileInfo} />
					<Comments post={post} comments={comments} />
				</StyledDiv>
			)}
			<WhoToFollowSidebar />
		</div>
	);
}

const StyledHeader = styled.header`
	display: flex;
`;

const StyledDiv = styled.section`
	border: 1px solid gray;
	color: white;
	width: 45vw;
	margin-right: 5vw;
	padding: 10px;
`;
