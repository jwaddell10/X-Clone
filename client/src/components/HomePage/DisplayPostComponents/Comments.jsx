import Comment from "./Comment";
import PropTypes from "prop-types";
export default function Comments({ post, comments }) {
	return (
		<>
			{comments?.map((comment, index) => (
				<Comment key={index} post={post} comment={comment} />
			))}
		</>
	);
}

Comments.propTypes = {
	post: PropTypes.object,
	comments: PropTypes.object,
};
