export default function CommentCount({ comments }) {
	//if the comment has children, render the number of child comments
	if (comments?.children) {
		return <div>{comments.children.length}</div>;
	}

	return <>{comments && <div>{comments.length}</div>}</>;
}