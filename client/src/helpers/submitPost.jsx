export default async function submitPost(text, url) {
	const JWTToken = localStorage.getItem("token");
	const loggedInUserId = localStorage.getItem("id");
	const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${JWTToken}`,
		},
		method: "POST",
		body: JSON.stringify({ text: text, loggedInUserId: loggedInUserId }),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	console.log(data, "data from submit post");
	return data;
}
