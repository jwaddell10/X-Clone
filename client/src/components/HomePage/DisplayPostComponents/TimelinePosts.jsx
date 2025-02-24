import useFetchPosts from "../../../helpers/useFetchPosts";
import "../../../Styles/TimeLinePosts.css";
import PropTypes from "prop-types";
import Post from "./Post";
import { useContext } from "react";
import { RefreshContext } from "../../../context/refreshTriggerContext";
export default function TimelinePosts() {
	const { refreshTrigger } = useContext(RefreshContext);
	const { posts, error } = useFetchPosts(refreshTrigger);
	return (
		<div>
			{error && <div style={{ color: "white" }}>{error.message}</div>}
			{posts?.map((post) => (
				<Post post={post} key={post.id} />
			))}
		</div>
	);
}

TimelinePosts.propTypes = {
	refreshTrigger: PropTypes.number,
};
