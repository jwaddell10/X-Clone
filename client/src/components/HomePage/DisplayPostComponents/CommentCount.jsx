export default function CommentCount({ comments }) {
	return <>{comments && <div>{comments.length}</div>}</>;
}
