import useFetchPosts from "../../../helpers/useFetchPosts";
import "../../../Styles/TimeLinePosts.css";
import PropTypes from "prop-types";
import Post from "./Post";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext} from "react";
import { RefreshContext } from "../../../context/refreshTriggerContext";
export default function TimelinePosts() {
	const { refreshTrigger } = useContext(RefreshContext);
	const { posts, loading, error } = useFetchPosts(refreshTrigger);

	if (loading) {
		return <CircularProgress />;
	}
	if (error) {
		return <div style={{ color: "white" }}>{error}</div>;
	}
	return (
		<div>
			{posts?.map((post) => (
				<Post post={post} key={post.id} />
			))}
		</div>
	);
}

TimelinePosts.propTypes = {
	refreshTrigger: PropTypes.number,
};
