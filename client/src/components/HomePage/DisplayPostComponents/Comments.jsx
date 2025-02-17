import Comment from "./Comment";

export default function Comments({ comments }) {
	return (
		<>
			{comments?.map((comment, id) => (
				<Comment key={id} comment={comment} id={id}/>
			))}
		</>
	);
}
