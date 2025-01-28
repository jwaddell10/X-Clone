import { useState } from "react";
import Button from "../../helpers/Button";
import CloseIcon from "@mui/icons-material/Close";
import "../.././Styles/EditProfile.css";
import submitEditProfile from "../../helpers/submitEditProfile.jsx";

export default function EditProfile({ profileInfo, profilePicture, onClose }) {
	const [editProfileError, setEditProfileError] = useState(null);
	const [borderToSelectedUrl, setBorderToSelectedUrl] = useState(false);
	const [formData, setFormData] = useState({
		imageUrl: profilePicture,
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await submitEditProfile({ formData }, profileInfo.id);

		if (!response.ok) {
			setEditProfileError(response);
		}
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
				</div>
				<div className="edit-name-container">
					<label htmlFor="name">Change Name</label>
					<input
						type="text"
						value={formData.username}
						onChange={handleChange}
						placeholder={profileInfo.user.name}
						minLength="5"
						required
					/>
				</div>
				<Button type="submit" text="Save" variant="saveButton" />
				{editProfileError && (
					<div style={{ color: "white" }}>
						{editProfileError.message}
					</div>
				)}
			</form>
		</>
	);
}
