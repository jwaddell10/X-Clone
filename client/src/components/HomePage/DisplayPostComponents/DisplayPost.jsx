import useFetchPosts from "../../../helpers/useFetchPosts";
import PersonIcon from "@mui/icons-material/Person";
import "../../../Styles/DisplayPost.css";
import PropTypes from "prop-types";
import PostReaction from "./PostReaction";
// import timeAgo from "../../helpers/timeAgo";

export default function DisplayPost({ refreshTrigger }) {
	const { posts } = useFetchPosts(refreshTrigger);

	return (
		<div>
			{posts?.map((post) => (
				<div className="display-post-container" key={post.id}>
					<div style={{ display: "flex" }}>
						{post.author.Profile === null ? (
							<div>
								<PersonIcon />
							</div>
						) : (
							<div style={{ display: "flex" }}>
								<img
									className="profile-picture-icon"
									src={post.author.Profile.profilePicture}
									alt="profile-picture-icon"
								/>
								<span>{post.author.name}</span>
								<span>{post.createdAt}</span>
							</div>
						)}
					</div>

					<div className="text-container">
						<div className="text-body-container">
							<span>{post.text}</span>
						</div>
					</div>
					<PostReaction post={post} />
				</div>
			))}
		</div>
	);
}

DisplayPost.propTypes = {
	refreshTrigger: PropTypes.number,
};
