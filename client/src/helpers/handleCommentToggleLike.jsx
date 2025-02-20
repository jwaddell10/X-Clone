export default async function handleCommentToggleLike(isLiked, loggedInUserId, comment, likeId) {
	if (!isLiked) {
		//add like
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/post/comment/${comment.id}/like`,
				{
					headers: {
						"Content-type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({ loggedInUserId }),
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			return error;
		}
	} else if (isLiked) {
		try {
			//remove like
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/post/comment/${likeId}/unlike`,
				{
					headers: {
						"Content-type": "application/json",
					},
					method: "DELETE",
					body: JSON.stringify({ loggedInUserId }),
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			return error;
		}
	}
}
