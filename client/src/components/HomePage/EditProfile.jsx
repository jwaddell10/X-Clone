import { useState } from "react";
import Button from "../../helpers/Button";
import CloseIcon from "@mui/icons-material/Close";
import "../.././Styles/EditProfile.css";
import fetchAllImageUrls from "../../helpers/useFetchAllImageUrls.jsx";
import submitEditProfile from "../../helpers/submitEditProfile.jsx";
// const images = import.meta.glob('/client/src/assets/*.{jpg}');
// import animeCat from "../.././assets"
// console.log(images, 'images')
// import images from "../.././assets"

//doing glob imports to import images to save time!!!//
export default function EditProfile({ profileInfo, profilePicture, onClose }) {
	const { imageUrls, error } = fetchAllImageUrls();
	const [formData, setFormData] = useState({
		imageUrl: "",
		username: "",
	});
	const profileImages = Object.values(
		import.meta.glob(
			"/src/assets/profileImages/*.{png,jpg,jpeg,svg,webp,avif}",
			{ eager: true, as: "url" }
		)
	);
	console.log(formData, "formdata");
	const handleChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			username: event.target.value,
		}));
		console.log(formData, "formdata");
	};
	// if (imageUrls) {
	// 	const result = imageUrls.split(/,(?=https)/);
	// 	console.log(result, "result");
	// }
	//edit profile
	//change name
	//change profile picture

	//onclick of profile, need to fetch images and display//

	//better to display on frontend, send item clicked to backend when user saves//

	const handleSubmit = async (event) => {
		event.preventDefault();
		await submitEditProfile({formData});
	};
	return (
		<>
			<form className="edit-profile-form" onSubmit={handleSubmit}>
				<CloseIcon onClick={onClose} className="close-icon" />
				<div className="profile-picture-container">
					{profileImages.map((url, index) => (
						<div
							onClick={() => {
								setFormData((prevState) => ({
									...prevState,
									imageUrl: url,
								}));
							}}
							className="image-container"
							key={index}
						>
							<img
								style={{ width: "5rem" }}
								key={index}
								src={url}
								alt={`Profile ${index + 1}`}
							/>
						</div>
					))}
					{/* <Button
						type="button"
						text="Change Picture"
						variant="changePicture"
					/> */}
				</div>
				<div className="edit-name-container">
					<label htmlFor="name">Change Name</label>
					<input
						type="text"
						value={formData.username}
						onChange={handleChange}
						placeholder={profileInfo.user.name}
						minLength="5"
					/>
				</div>
				<Button type="submit" text="Save" variant="saveButton" />
			</form>
		</>
	);
}
