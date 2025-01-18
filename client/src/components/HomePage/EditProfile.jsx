export default function EditProfile() {
	//what does profile need?

	//profile picture
	//bio

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("handle submit edit profile runs");
	};
	return (
		<>
			<form onSubmit={handleSubmit}></form>
		</>
	);
}
