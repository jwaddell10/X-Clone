import CommentReaction from "./CommentReaction";
import LikeReaction from "./LikeReaction";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useState, useEffect } from "react";
import handleCommentToggleLike from "../../../helpers/handleCommentToggleLike";

export default function Comments({ post, comments }) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);

	const loggedInUserId = localStorage.getItem("id");
	console.log(comments.map((comment) => console.log(comment, 'comment')))
    // const isCommentLikedByUser = comments.map((comment => comment.author.likes.some((like) => like.userId == loggedInUserId)))

	// const totalLikes = comments.author.likes.length;

	// useEffect(() => {
	// 	setIsLiked(isPostLikedByUser);
	// 	setLikeCount(totalLikes);
	// }, [isPostLikedByUser, totalLikes]);

	const toggleLike = async (comment) => {
		setIsLiked(!isLiked);
		setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
		await handleCommentToggleLike(isLiked, loggedInUserId, post.id, comment);
	};

	return (
		<>
			{comments?.map((comment, id) => (
				<div key={id}>
					<div className="header-container">
						<img
							src={comment.author.Profile.profilePicture}
							alt=""
						/>
						<div>{comment.author.name}</div>
					</div>
					<div className="text-container">{comment.text}</div>
					<CommentReaction comments={comment} />
					<RepeatIcon />
					<LikeReaction
						isLiked={isLiked}
						likes={comment.author.likes}
						toggleLike={() => {toggleLike(comment)}}
					/>
				</div>
			))}
		</>
	);
}
