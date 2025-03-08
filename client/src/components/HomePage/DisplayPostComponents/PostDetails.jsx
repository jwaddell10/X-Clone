import useFetchPost from "../../../helpers/useFetchPost";
import PostReaction from "./PostReaction";
import Comments from "./Comments";
import useFetchComments from "../../../helpers/useFetchComments";
import { Link } from "react-router";
import { styled } from "styled-components";
import { useParams } from "react-router";
import SideNavigation from "../SideNavigation";
import WhoToFollowSidebar from "../WhoToFollowSidebar";
import ComposeReply from "../../HomePage/ComposeReply";
import useGetLoggedInUserProfileInfo from "../../../helpers/useGetLoggedInUserProfileInfo";
import CircularProgress from "@mui/material/CircularProgress";
import { RefreshContext } from "../../../context/refreshTriggerContext";
import { useContext } from "react";
import formatDate from "../../../helpers/formatDate";

export default function PostDetails() {
	const { username, postId } = useParams();
	const { refreshTrigger } = useContext(RefreshContext);
	const { post, loading, error } = useFetchPost(
		username,
		postId,
		refreshTrigger
	);
	const { comments } = useFetchComments(postId, refreshTrigger);
	const { profileInfo } = useGetLoggedInUserProfileInfo();

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <div style={{ color: "white" }}>Error: {error}</div>;
	}

	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
			<SideNavigation profileInfo={profileInfo} />
			{post && (
				<StyledDiv>
					<StyledHeader className="post-header">
						<Link to={`/profile/${post.author.Profile.id}`}>
							<StyledImage
								src={post.author.Profile.profilePicture}
								alt="profile picture"
							/>
						</Link>
						<div>{username}</div>
						<div className="created-at">
							{formatDate(post.createdAt)}
						</div>
					</StyledHeader>

					<StyledTextContainr className="post-text-container">
						{post.text}
					</StyledTextContainr>
					<PostReaction post={post} comments={comments} />
					<ComposeReply
						profilePicture={profileInfo.profilePicture}
						postId={post.id}
					/>
					<Comments post={post} comments={comments} />
				</StyledDiv>
			)}
			<WhoToFollowSidebar />
		</div>
	);
}

const breakpoints = {
	small: "500px",
	medium: "768px",
};

const StyledHeader = styled.header`
	display: flex;
	gap: 5px;
	padding: 10px;
`;

const StyledDiv = styled.section`
	border: 1px solid gray;
	color: white;
	width: 45vw;
	height: 100vh;
	margin-right: 5vw;

	@media (max-width: ${breakpoints.medium}) {
		width: 75vw;
	}

	@media (max-width: ${breakpoints.small}) {
		width: 100vw;
	}
`;

const StyledTextContainr = styled.div`
	padding: 10px;
`;

const StyledImage = styled.img`
	width: 40px;
`;
