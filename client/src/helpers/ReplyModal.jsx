import { useRef, useEffect } from "react";
import Modal from "./Modal";
import Post from "../components/HomePage/DisplayPostComponents/Post";
import Comment from "../components/HomePage/DisplayPostComponents/Comment";
import ComposeReply from "../components/HomePage/ComposeReply";

export default function ReplyModal({
	post,
	comment,
	onSubmit,
	modalData,
	isOpen,
	onClose,
}) {
	// const {postId} = useParams();
	// console.log(postId, 'postId')
	const focusInputRef = useRef(null);
	useEffect(() => {
		if (isOpen && focusInputRef.current) {
			setTimeout(() => {
				focusInputRef.current.focus();
			}, 0);
		}
	}, [isOpen]);
	return (
		<Modal
			isOpen={isOpen}
			hasCloseBtn={true}
			onClose={onClose}
			comment={comment}
		>
			{/* if user clicks on a comment with an id render the comment details, otherwise render post details */}
			{comment.id ? (
				<>
					<Comment comment={comment} showReactions={false} />
					<ComposeReply
						profileInfo={post.author.Profile}
						postId={post.id}
						commentId={comment.id}
					/>
				</>
			) : (
				<>
					<Post post={post} showReactions={false} />
					<ComposeReply
						profileInfo={post.author.Profile}
						postId={post.id}
					/>
				</>
			)}
		</Modal>
	);
}
