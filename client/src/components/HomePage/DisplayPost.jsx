import useFetchPosts from "../../helpers/useFetchPosts";
import "../../Styles/DisplayPost.css";
import PropTypes from "prop-types";

export default function DisplayPost({ refreshTrigger }) {
	const { posts } = useFetchPosts(refreshTrigger);

	return (
		<div>
			{posts &&
				posts.map((item) => (
					<span className="display-post-container" key={item.id}>
						<li>{item.author.name}</li>
						<li>{item.createdAt}</li>
						<li>{item.text}</li>
					</span>
				))}
		</div>
	);
}

DisplayPost.propTypes = {
	refreshTrigger: PropTypes.number,
};
