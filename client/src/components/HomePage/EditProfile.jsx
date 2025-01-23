import Button from "../../helpers/Button";

export default function EditProfile() {
	console.log("does edit profile run onclick");
	//what does profile need?

	//profile picture
	//bio

	//plan = edit profile, initially just show profile,
	// have profile picture (a default, regular person one...)
	// have profile name (username)
	// have bio
	// have follower count and following count
	// have edit profile button, basically recreate twitter,
	// if edit profile is clicked do a popup form like twitter

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("handle submit edit profile runs");
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<Button text="Change Picture" variant="changePicture"></Button>
				<label htmlFor="name">Change Name</label>
			</form>
		</>
	);
}
