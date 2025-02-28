import Comment from "./Comment";

export default function Comments({ post, comments }) {
	return (
		<>
			{comments?.map((comment, index) => (
				<Comment key={index} post={post} comment={comment}/>
			))}
		</>
	);
}
