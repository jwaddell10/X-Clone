export default function LikeCount({ isLiked, likes }) {
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
