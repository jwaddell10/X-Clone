export default async function postFormData(formData, url) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/auth/${url}`,
			{
				method: "POST",
				body: formData,
			}
		);

		const data = await response.json();
		console.log(data, "this is data from post requets");
	} catch (error) {
		throw new Error(error);
	}
}
