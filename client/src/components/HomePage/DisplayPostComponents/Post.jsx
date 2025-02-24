import PostReaction from "./PostReaction";
import { Link } from "react-router";
import { styled } from "styled-components";
import "../../../Styles/Post.css";

export default function Post({ post }) {
	// const { refreshTrigger, triggerRefresh } = useContext(RefreshContext);
	return (
		<div>
			<StyledDiv to={`${post.author.name}/${post.id}`}>
				{post && (
					<div
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
								<div className="created-at">
									{post.createdAt}
								</div>
							</StyledHeader>
							<div className="post-text-contaiiner">
								{post.text}
							</div>
						</Link>

						<PostReaction post={post}></PostReaction>
					</div>
				)}
			</StyledDiv>
		</div>
	);
}

const StyledHeader = styled.header`
	display: flex;
`;

const StyledDiv = styled.div`
	border-bottom: 1px solid gray;
	color: white;
	text-decoration: none;
	display: block;
`;
