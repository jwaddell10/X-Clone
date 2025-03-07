import LikeReaction from "./LikeReaction";
import RepeatIcon from "@mui/icons-material/Repeat";
import handleCommentToggleLike from "../../../helpers/handleCommentToggleLike";
import CommentReaction from "./CommentReaction";
import { useState, useEffect, useContext } from "react";
import { RefreshContext } from "../../../context/refreshTriggerContext";
import { styled } from "styled-components";
import { Link } from "react-router";
import formatDate from "../../../helpers/formatDate";

export default function Comment({ post, comment }) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);

	const { triggerRefresh } = useContext(RefreshContext);

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
		const likeId = comment.likes.find(
			(like) => like.userId == loggedInUserId
		)?.id;

		setIsLiked(!isLiked);
		setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
		try {
			const data = await handleCommentToggleLike(
				isLiked,
				loggedInUserId,
				comment.id,
				likeId
			);

			triggerRefresh();
		} catch (error) {
			console.log(error, "error comment");
		}
	};
	return (
		<div
			className="comment"
			style={{ borderBottom: "1px solid gray", color: "white" }}
		>
			<Link
				style={{ color: "white" }}
				to={`/comment/${comment.author.name}/${comment.id}`}
				className="header-text-container"
			>
				<StyledHeader className="header-container">
					<Link to={`/profile/${comment.author.Profile.id}`}>
						<StyledImage
							src={comment.author.Profile.profilePicture}
							alt="profile picture"
						/>
					</Link>

					<div>{comment.author.name}</div>
					<div className="created-at">
						{formatDate(comment.createdAt)}
					</div>
				</StyledHeader>
				<div className="text-container">{comment.text}</div>
			</Link>
			<div
				className="reaction-container"
				style={{ display: "flex", justifyContent: "space-around" }}
			>
				<CommentReaction post={post} comments={comment} />
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
	gap: 5px;
`;

const StyledImage = styled.img`
	width: 40px;
`;
