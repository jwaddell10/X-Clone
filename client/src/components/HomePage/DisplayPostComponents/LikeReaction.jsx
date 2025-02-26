import LikeCount from "./LikeCount";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function LikeReaction({ isLiked, likes, toggleLike }) {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: "0.25vw", cursor: "pointer" }}>
			<LikeCount likes={likes} />
			{isLiked ? (
				<FavoriteIcon sx={{ color: "red" }} onClick={toggleLike} />
			) : (
				<FavoriteBorderIcon onClick={toggleLike} />
			)}
		</div>
	);
}
