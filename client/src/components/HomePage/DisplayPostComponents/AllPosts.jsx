import useFetchPosts from "../../../helpers/useFetchPosts";
import PersonIcon from "@mui/icons-material/Person";
import "../../../Styles/DisplayPost.css";
import PropTypes from "prop-types";
import PostReaction from "./PostReaction";
import { Link } from "react-router";
// import timeAgo from "../../helpers/timeAgo";

export default function AllPosts({ refreshTrigger }) {
	const { posts, error } = useFetchPosts(refreshTrigger);
	return (
		<div>
			{error && <div style={{ color: "white" }}>{error.message}</div>}
			{posts?.map((post) => (
				<Link
					to={`${post.author.name}/${post.id}`}
					className="display-post-container"
					key={post.id}
				>
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
				</Link>
			))}
		</div>
	);
}

AllPosts.propTypes = {
	refreshTrigger: PropTypes.number,
};
