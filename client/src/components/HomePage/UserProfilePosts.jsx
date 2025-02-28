import useFetchProfilePosts from "../../helpers/useFetchProfilePosts";
import PostReaction from "./DisplayPostComponents/PostReaction";
import { Link } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserProfilePosts({ profileId }) {
	const { posts, loading, error } = useFetchProfilePosts(profileId);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <div style={{ color: "white" }}>{error}</div>;
	}

	return (
		<div>
			{posts?.map((post) => (
				<div className="display-post-container" key={post.id}>
					<Link
						to={`/${post.author.name}/${post.id}`}
						className="main-post-container"
					>
						<div style={{ display: "flex" }}>
							<div style={{ display: "flex" }}>
								<img
									className="profile-picture-icon"
									src={post.author.Profile.profilePicture}
									alt="profile-picture-icon"
								/>

								<span>{post.author.name}</span>
								<span>{post.createdAt}</span>
							</div>
						</div>

						<div className="text-container">
							<div className="text-body-container">
								<span>{post.text}</span>
							</div>
						</div>
					</Link>
					<PostReaction post={post} comments={post.Comment} />
				</div>
			))}
		</div>
	);
}
