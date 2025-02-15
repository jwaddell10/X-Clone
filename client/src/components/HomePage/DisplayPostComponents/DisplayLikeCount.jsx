export default function DisplayLikeCount({ isLiked, likes }) {
	return (
		<>
			{isLiked ? (
				<span>{likes}</span>
			) : (
				<span>{likes}</span>
			)}
		</>
	);
}
