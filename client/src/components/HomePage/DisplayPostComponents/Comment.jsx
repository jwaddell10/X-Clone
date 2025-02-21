import LikeReaction from "./LikeReaction";
import RepeatIcon from "@mui/icons-material/Repeat";
import handleCommentToggleLike from "../../../helpers/handleCommentToggleLike";
import CommentReaction from "./CommentReaction";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

export default function Comment({ comment, id }) {
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
		await handleCommentToggleLike(
			isLiked,
			loggedInUserId,
			comment,
			comment.post.id
		);
	};
	return (
		<div key={id} style={{ borderBottom: "1px solid gray" }}>
			<StyledHeader className="header-container">
				<img
					src={comment.author.Profile.profilePicture}
					alt="profile picture"
				/>
				<div>{comment.author.name}</div>
			</StyledHeader>
			<div className="text-container">{comment.text}</div>
			<div
				className="reaction-container"
				style={{ display: "flex", justifyContent: "space-around" }}
			>
				<CommentReaction comments={comment} />
				<RepeatIcon />
				<LikeReaction
					isLiked={isLiked}
					likes={likeCount}
					toggleLike={() => {
						toggleLike(comment);
					}}
				/>
			</div>
		</div>
	);
}

const StyledHeader = styled.header`
	display: flex;
`;
