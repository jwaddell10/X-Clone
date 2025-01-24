import Button from "../../helpers/Button";
import CloseIcon from "@mui/icons-material/Close";
import "../.././Styles/EditProfile.css";
import fetchAllImageUrls from "../../helpers/useFetchAllImageUrls.jsx";
// const images = import.meta.glob('/client/src/assets/*.{jpg}');
// import animeCat from "../.././assets"
// console.log(images, 'images')
// import images from "../.././assets"

//doing glob imports to import images to save time!!!//
export default function EditProfile({ profilePicture, onClose }) {
	const { imageUrls, error } = fetchAllImageUrls();
	console.log(imageUrls, "imageurls");
	const profileImages = Object.values(
		import.meta.glob(
			"/src/assets/profileImages/*.{png,jpg,jpeg,svg,webp,avif}",
			{ eager: true, as: "url" }
		)
	);
	console.log("profile images", profileImages);

	// if (imageUrls) {
	// 	const result = imageUrls.split(/,(?=https)/);
	// 	console.log(result, "result");
	// }
	//edit profile
	//change name
	//change profile picture

	//onclick of profile, need to fetch images and display//

	//better to display on frontend, send item clicked to backend when user saves//

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("handle submit edit profile runs");
	};
	return (
		<>
			<form className="edit-profile-form" onSubmit={handleSubmit}>
				<CloseIcon onClick={onClose} className="close-icon" />
				<div className="profile-picture-container">
					{profileImages.map((url, index) => (
						<img
							style={{ width: "5rem" }}
							key={index}
							src={url}
							alt={`Profile ${index + 1}`}
						/>
					))}
					<Button
						type="button"
						text="Change Picture"
						variant="changePicture"
					/>
				</div>
				<div className="edit-name-container">
					<label htmlFor="name">Change Name</label>
					<input type="text" />
				</div>
				<Button type="submit" text="Save" variant="saveButton" />
			</form>
		</>
	);
}
