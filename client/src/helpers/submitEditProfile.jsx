export default async function submitEditProfile({ formData }) {
	const id = localStorage.getItem("id");
	const JWTToken = localStorage.getItem("token");
	console.log(formData, "make sure edit profile formdata works");

	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/profile/edit/${id}`,
			{
				method: "POST",
				body: formData,
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${JWTToken}`,
				},
			}
		);

		const data = await response.json();
		console.log(data, "data");
	} catch (error) {
		throw new Error(error);
	}
}
