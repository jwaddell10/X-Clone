import { useParams } from "react-router";
import useFetchComment from "../../../helpers/useFetchComment";
import SideNavigation from "../SideNavigation";
import WhoToFollowSidebar from "../WhoToFollowSidebar";
import PostReaction from "./PostReaction";
import ComposeReply from "../ComposeReply";
import Comments from "./Comments";
import { Link } from "react-router";
import { styled } from "styled-components";

export default function CommentDetails() {
	const { username, commentId } = useParams();
	const { comment } = useFetchComment(username, commentId);
    console.log(comment, 'comment')
	return (
		<div
			style={{
				color: "white",
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
			}}
		>
			<SideNavigation />

			{comment && (
				<StyledDiv>
					<StyledHeader className="post-header">
						<Link to={`/profile/${comment.author.Profile.id}`}>
							<img
								src={comment.author.Profile.profilePicture}
								alt="profile picture"
							/>
						</Link>
						<div>{username}</div>
						<div className="created-at">{comment.createdAt}</div>
					</StyledHeader>

					<div className="post-text-container">{comment.text}</div>
					<PostReaction post={comment} comments={comment.children} />
					<ComposeReply
						profilePicture={comment.author.Profile.profilePicture}
						commentId={comment.id}
					/>
					<Comments post={comment} comments={comment.children} />
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
`;

const StyledDiv = styled.section`
	border: 1px solid gray;
	color: white;
	width: 45vw;
	margin-right: 5vw;
	padding: 10px;

	@media (max-width: ${breakpoints.medium}) {
		width: 75vw;
	}

	@media (max-width: ${breakpoints.small}) {
		width: 100vw;
	}
`;
