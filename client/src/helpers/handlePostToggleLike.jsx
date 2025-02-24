export default async function handlePostToggleLike(
	isLiked,
	loggedInUserId,
	post,
	likeId
) {
	if (!isLiked) {
		//add like

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/post/${post.id}/like`,
			{
				headers: {
					"Content-type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ loggedInUserId: loggedInUserId }),
			}
		);
		const data = await response.json();
		return data;
	} else if (isLiked) {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/post/${post.id}/unlike`,
			{
				headers: {
					"Content-type": "application/json",
				},
				method: "DELETE",
				body: JSON.stringify({ likeId: likeId }),
			}
		);
		const data = await response.json();
		return data;
	}
}
