export default async function submitPost(text, url) {
	const JWTToken = localStorage.getItem("token");
	const id = localStorage.getItem("id");

	try {
		const response = await fetch("http://localhost:3000/post", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${JWTToken}`,
			},
			method: "POST",
			body: JSON.stringify({ text: text, id: id }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data, "this is data");
		return data;
	} catch (error) {
		console.error("There was a problem with the fetch operation:", error);
		throw error;
	}
}
