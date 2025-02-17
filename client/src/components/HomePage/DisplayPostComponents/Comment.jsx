import LikeReaction from "./LikeReaction";
import RepeatIcon from "@mui/icons-material/Repeat";
import handleCommentToggleLike from "../../../helpers/handleCommentToggleLike";
import { useState, useEffect } from "react";

export default function Comment({ comment, id }) {
    console.log(comment, 'commentin comment')
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);

	const loggedInUserId = localStorage.getItem("id");

	const isCommentLikedByUser = comment.likes.some(
		(like) => like.userId == loggedInUserId
	);

	const totalLikes = comment.likes.length;

	useEffect(() => {
		setIsLiked(isCommentLikedByUser);
		setLikeCount(totalLikes);
	}, [isCommentLikedByUser, totalLikes]);

	const toggleLike = async () => {
		setIsLiked(!isLiked);
		setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
		await handleCommentToggleLike(isLiked, loggedInUserId, comment, comment.post.id);
	};
	return (
		<div key={id}>
			<div className="header-container">
				<img src={comment.author.Profile.profilePicture} alt="" />
				<div>{comment.author.name}</div>
			</div>
			<div className="text-container">{comment.text}</div>
			{/* <CommentReaction comment={comment} /> */}
			<RepeatIcon />
			<LikeReaction
				isLiked={isLiked}
				likes={likeCount}
				toggleLike={() => {
					toggleLike(comment);
				}}
			/>
		</div>
	);
}
