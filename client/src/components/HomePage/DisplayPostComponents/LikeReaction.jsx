import LikeCount from "./LikeCount";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PropTypes from "prop-types";

export default function LikeReaction({ isLiked, likes, toggleLike }) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "0.25vw",
				cursor: "pointer",
			}}
		>
			<LikeCount likes={likes} />
			{isLiked ? (
				<FavoriteIcon sx={{ color: "red" }} onClick={toggleLike} />
			) : (
				<FavoriteBorderIcon onClick={toggleLike} />
			)}
		</div>
	);
}

LikeReaction.propTypes = {
	isLiked: PropTypes.boolean,
	likes: PropTypes.number,
	toggleLike: PropTypes.func,
};
