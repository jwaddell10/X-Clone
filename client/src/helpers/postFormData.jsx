export default async function postFormData(formData, url) {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/auth/${url}`,
		{
			method: "POST",
			body: JSON.stringify(formData),
			headers: { "Content-type": "application/json" },
		}
	);
	const data = await response.json();
	if (data.token && data.id) {
		localStorage.setItem("token", data.token);
		localStorage.setItem("id", data.id);
	}
	return data;
}
