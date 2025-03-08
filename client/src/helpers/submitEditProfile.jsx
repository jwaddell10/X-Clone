export default async function submitEditProfile({ formData }, profileId) {
	const id = localStorage.getItem("id");
	const JWTToken = localStorage.getItem("token");

	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/profile/edit/${profileId}`,
		{
			method: "POST",
			body: JSON.stringify({ formData: formData, userId: id }),
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${JWTToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error("Error occurred when submitting profile");
	}

	const data = await response.json();
	return data;
}
