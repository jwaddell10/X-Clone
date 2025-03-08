import PropTypes from "prop-types";

export default function LikeCount({ likes }) {
	return <>{likes && <span>{likes}</span>}</>;
}

LikeCount.propTypes = {
	likes: PropTypes.object,
};
