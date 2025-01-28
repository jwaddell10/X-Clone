export default async function submitEditProfile({ formData }, profileId) {
	// console.log(formData, 'formdata')
	const id = localStorage.getItem("id");
	const JWTToken = localStorage.getItem("token");
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/profile/edit/${profileId}`,
			{
				method: "POST",
				body: JSON.stringify({formData: formData, userId: id}),
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${JWTToken}`,
				},
			}
		);

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error, 'error in catch')
		return error;
	}
}
