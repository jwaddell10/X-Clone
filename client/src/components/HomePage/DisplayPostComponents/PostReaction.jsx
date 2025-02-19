import RepeatIcon from "@mui/icons-material/Repeat";
import CommentReaction from "./CommentReaction";
import LikeReaction from "./LikeReaction";
import { useState, useEffect } from "react";
import handlePostToggleLike from "../../../helpers/handlePostToggleLike";

export default function PostReaction({ post }) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);

	const loggedInUserId = localStorage.getItem("id");

	const isPostLikedByUser = post.likes?.some(
		(like) => like.userId == loggedInUserId
	);

	const totalLikes = post.likes.length;

	useEffect(() => {
		setIsLiked(isPostLikedByUser);
		setLikeCount(totalLikes);
	}, [isPostLikedByUser, totalLikes]);

	const toggleLike = async () => {
		setIsLiked(!isLiked);
		setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
		await handlePostToggleLike(isLiked, loggedInUserId, post);
	};

	return (
		<div className="post-reaction-container">
			<CommentReaction comments={post.Comment} />
			<RepeatIcon />
			<LikeReaction
				isLiked={isLiked}
				likes={likeCount}
				toggleLike={toggleLike}
			/>
		</div>
	);
}
