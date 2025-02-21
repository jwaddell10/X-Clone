import PostReaction from "./PostReaction";
import { Link } from "react-router";
import { styled } from "styled-components";
import "../../../Styles/Post.css";

export default function Post({ post }) {
	return (
		<div>
			<StyledLink to={`${post.author.name}/${post.id}`}>
				{post && (
					<div
						className="post-item-container"
						style={{
							padding: "10px",
						}}
					>
						<StyledHeader className="post-header">
							<Link to={`/profile/${post.author.Profile.id}`}>
								<img
									src={post.author.Profile.profilePicture}
									alt="profile picture"
								/>
							</Link>
							<div className="created-at">{post.createdAt}</div>
						</StyledHeader>
						<div className="post-text-contaiiner">{post.text}</div>
						<PostReaction post={post}></PostReaction>
					</div>
				)}
			</StyledLink>
		</div>
	);
}

const StyledHeader = styled.header`
	display: flex;
`;

const StyledLink = styled(Link)`
	border-bottom: 1px solid gray;
	color: white;
	text-decoration: none;
	display: block;
`;
