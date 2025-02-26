export default async function submitReply(text, postId, commentId) {
	if (commentId === null) {
		const JWTToken = localStorage.getItem("token");
		const loggedInUserId = localStorage.getItem("id");

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/post/${postId}/comment`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${JWTToken}`,
				},
				method: "POST",
				body: JSON.stringify({ text: text, loggedInUserId: loggedInUserId }),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} else {
		const JWTToken = localStorage.getItem("token");
		const loggedInUserId = localStorage.getItem("id");

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/post/${postId}/comment/${commentId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${JWTToken}`,
				},
				method: "POST",
				body: JSON.stringify({ text: text, id: loggedInUserId }),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	}
}
