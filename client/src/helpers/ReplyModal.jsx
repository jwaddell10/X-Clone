import { useRef, useEffect, useContext } from "react";
import Modal from "./Modal";
import Post from "../components/HomePage/DisplayPostComponents/Post";
import Comment from "../components/HomePage/DisplayPostComponents/Comment";
import ComposeReply from "../components/HomePage/ComposeReply";
import ComposePost from "../components/HomePage/ComposePost";
import useGetLoggedInUserProfileInfo from "./useGetLoggedInUserProfileInfo";
import { RefreshContext } from "../context/refreshTriggerContext";

export default function ReplyModal({ post, comment, isOpen, onClose }) {
	const { refreshTrigger } = useContext(RefreshContext);
	const { profileInfo } = useGetLoggedInUserProfileInfo(refreshTrigger);
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
			<ComposePost profileInfo={profileInfo} />

			{/* If a comment exists, show the comment details; otherwise, show the post */}
			{comment?.id ? (
				<>
					<Comment comment={comment} showReactions={false} />
					{post?.id && (
						<ComposeReply
							profileInfo={post?.author?.Profile}
							postId={post.id}
							commentId={comment.id}
						/>
					)}
				</>
			) : post?.id ? (
				<>
					<Post post={post} showReactions={false} />
					<ComposeReply
						profileInfo={post?.author?.Profile}
						postId={post.id}
					/>
				</>
			) : null}
		</Modal>
	);
}
