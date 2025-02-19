import useFetchProfilePosts from "../../helpers/useFetchProfilePosts";
import PostReaction from "./DisplayPostComponents/PostReaction";
import { Link } from "react-router";

export default function UserProfilePosts({ profileId }) {
	const { posts, error } = useFetchProfilePosts(profileId);
	return (
		<div>
			{error && <div style={{ color: "white" }}>{error.message}</div>}
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

					<PostReaction post={post} />
				</div>
			))}
		</div>
	);
}
