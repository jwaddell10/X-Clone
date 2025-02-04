import useFetchPosts from "../../helpers/useFetchPosts";
import PersonIcon from "@mui/icons-material/Person";
import "../../Styles/DisplayPost.css";
import PropTypes from "prop-types";

export default function DisplayPost({ refreshTrigger }) {
	const { posts } = useFetchPosts(refreshTrigger);

	return (
		<div>
			{posts?.map((post) => (
				<span className="display-post-container" key={post.id}>
					<div className="name-container">
						{post.author.Profile === null ? (
							<div>
								<PersonIcon />
							</div>
						) : (
							<img
								className="profile-picture-icon"
								src={post.author.Profile.profilePicture}
								alt="profile-picture-icon"
							/>
						)}
						<div className="text-container">
							<span>{post.author.name}</span>
							<span>{post.createdAt}</span>
							<div className="text-body-container">
								<span>{post.text}</span>
							</div>
						</div>
					</div>
				</span>
			))}
		</div>
	);
}

DisplayPost.propTypes = {
	refreshTrigger: PropTypes.number,
};
