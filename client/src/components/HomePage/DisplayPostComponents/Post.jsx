import PostReaction from "./PostReaction";
import { Link } from "react-router";
import { styled } from "styled-components";
import formatDate from "../../../helpers/formatDate";

export default function Post({ post, showReactions = true }) {
	return (
		<OuterStyledDiv to={`${post.author.name}/${post.id}`}>
			{post && (
				<InnerStyledDiv
					className="post-item-container"
					style={{
						padding: "10px",
					}}
				>
					<Link
						to={`${post.author.name}/${post.id}`}
						className="header-and-text-container"
						style={{ color: "inherit", textDecoration: "none" }}
					>
						<StyledHeader className="post-header">
							<Link to={`/profile/${post.author.Profile.id}`}>
								<img
									src={post.author.Profile.profilePicture}
									alt="profile picture"
								/>
							</Link>
							<div className="username">{post.author.name}</div>
							<div className="created-at">
								{formatDate(post.createdAt)}
							</div>
						</StyledHeader>
						<div className="post-text-contaiiner">{post.text}</div>
					</Link>

					{showReactions && (
						<PostReaction
							post={post}
							comments={post.Comment}
						></PostReaction>
					)}
				</InnerStyledDiv>
			)}
		</OuterStyledDiv>
	);
}

const breakpoints = {
	small: "500px",
	medium: "768px",
	large: "1200px",
};

const StyledHeader = styled.header`
	display: flex;
`;

const OuterStyledDiv = styled.div`
	border-bottom: 1px solid gray;
	color: white;
	text-decoration: none;
	display: block;

	@media (max-width: ${breakpoints.medium}) {
		width: 75vw;
	}

	@media (max-width: ${breakpoints.small}) {
		width: 100vw;
	}
`;

const InnerStyledDiv = styled.div`
	@media (max-width: ${breakpoints.medium}) {
		width: 75vw;
	}

	@media (max-width: ${breakpoints.small}) {
		width: 100vw;
	}
`;
