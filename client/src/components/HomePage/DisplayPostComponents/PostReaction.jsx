import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import DisplayLikeCount from "./DisplayLikeCount";
import DisplayCommentCount from "./DisplayCommentCount";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import handleToggleLike from "../../../helpers/toggleLike";

export default function PostReaction({ post }) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);

	const loggedInUserId = localStorage.getItem("id");

	// Check if the logged-in user has liked the post
	const isPostLikedByUser = post.likes.some(
		(like) => like.userId == loggedInUserId
	);

	// Total number of likes on the post
	const totalLikes = post.likes.length;

	// Update state based on whether the post is liked and the total likes
	useEffect(() => {
		setIsLiked(isPostLikedByUser);
		setLikeCount(totalLikes);
	}, [isPostLikedByUser, totalLikes]);

	const toggleLike = async () => {
		setIsLiked(!isLiked);
		if (!isLiked) {
			setLikeCount((prevCount) => prevCount + 1);
			handleToggleLike(isLiked, loggedInUserId, post);
		} else if (isLiked) {
			setLikeCount((prevCount) => prevCount - 1);
			handleToggleLike(isLiked, loggedInUserId, post);
		}
	};

	return (
		<div className="post-reaction-container">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.25vw",
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-chat"
					viewBox="0 0 16 16"
				>
					<path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
				</svg>
				<DisplayCommentCount comments={post.Comment} />
			</div>

			<RepeatIcon />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.25vw",
				}}
			>
				{isLiked ? (
					<>
						<DisplayLikeCount isLiked={isLiked} likes={likeCount} />
						<FavoriteIcon
							sx={{ color: "red" }}
							onClick={toggleLike}
						/>
					</>
				) : (
					<>
						<DisplayLikeCount isLiked={isLiked} likes={likeCount} />
						<FavoriteBorderIcon onClick={toggleLike} />
					</>
				)}
			</div>
		</div>
	);
}
