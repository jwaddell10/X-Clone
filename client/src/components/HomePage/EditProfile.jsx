import { useState } from "react";
import Button from "../../helpers/Button";
import CloseIcon from "@mui/icons-material/Close";
import "../.././Styles/EditProfile.css";
import fetchAllImageUrls from "../../helpers/useFetchAllImageUrls.jsx";
import submitEditProfile from "../../helpers/submitEditProfile.jsx";

export default function EditProfile({ profileInfo, profilePicture, onClose }) {
	const { imageUrls, error } = fetchAllImageUrls();
	const [borderToSelectedUrl, setBorderToSelectedUrl] = useState(false);
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
	const handleChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			username: event.target.value,
		}));
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
		await submitEditProfile({ formData }, profileInfo.id);
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
								setBorderToSelectedUrl(url);
							}}
							className={`image-container${
								borderToSelectedUrl === url ? "-selected" : ""
							}`}
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
