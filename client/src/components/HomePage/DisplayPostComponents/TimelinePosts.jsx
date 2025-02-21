import useFetchPosts from "../../../helpers/useFetchPosts";
import "../../../Styles/TimeLinePosts.css";
import PropTypes from "prop-types";
import Post from "./Post";

export default function TimelinePosts({ refreshTrigger }) {
	const { posts, error } = useFetchPosts(refreshTrigger);
	return (
		<div>
			{error && <div style={{ color: "white" }}>{error.message}</div>}
			{posts?.map((post) => (
				<Post post={post} key={post.id}/>
			))}
		</div>
	);
}

TimelinePosts.propTypes = {
	refreshTrigger: PropTypes.number,
};
