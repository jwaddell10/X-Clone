import RepeatIcon from "@mui/icons-material/Repeat";
import CommentReaction from "./CommentReaction";
import LikeReaction from "./LikeReaction";
import { useState, useEffect, useContext } from "react";
import handlePostToggleLike from "../../../helpers/handlePostToggleLike";
import { RefreshContext } from "../../../context/refreshTriggerContext";

export default function PostReaction({ post, comments }) {
	const { triggerRefresh } = useContext(RefreshContext);

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
		const likeId = post.likes.find(
			(like) => like.userId == loggedInUserId
		)?.id;
console.log(likeId, 'like id in toggle like')
		// Optimistically update the UI
		const previousIsLiked = isLiked;
		const previousLikeCount = likeCount;

		setIsLiked(!isLiked);
		setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

		try {
			const data = await handlePostToggleLike(
				isLiked,
				loggedInUserId,
				post,
				likeId
			);
			triggerRefresh();
		} catch (error) {
			console.error("Failed to toggle like:", error);
			setIsLiked(previousIsLiked);
			setLikeCount(previousLikeCount);
		}
	};

	return (
		<div className="post-reaction-container">
			<CommentReaction post={post} comments={comments} />
			<RepeatIcon />
			<LikeReaction
				isLiked={isLiked}
				likes={likeCount}
				toggleLike={toggleLike}
			/>
		</div>
	);
}
