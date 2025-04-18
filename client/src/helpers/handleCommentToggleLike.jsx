export default async function handleCommentToggleLike(
	isLiked,
	loggedInUserId,
	commentId,
	likeId
) {
	const JWTToken = localStorage.getItem("token");
	if (!isLiked) {
		//add like

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/post/comment/${commentId}/like`,
			{
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${JWTToken}`,
				},
				method: "POST",
				body: JSON.stringify({ loggedInUserId }),
			}
		);
		const data = await response.json();
		return data;
	} else if (isLiked) {
		//remove like
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/post/comment/${commentId}/unlike`,
			{
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${JWTToken}`,
				},
				method: "DELETE",
				body: JSON.stringify({ loggedInUserId, likeId }),
			}
		);
		const data = await response.json();
		return data;
	}
}
