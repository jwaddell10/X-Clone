import { useState, useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext.jsx";
import Button from "../../helpers/Button";
import CloseIcon from "@mui/icons-material/Close";
import "../.././Styles/EditProfile.css";
import submitEditProfile from "../../helpers/submitEditProfile.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

export default function EditProfile({ profileInfo, onClose }) {
	const { triggerRefresh } = useContext(RefreshContext);

	const [isLoading, setIsLoading] = useState(false);
	const [editProfileError, setEditProfileError] = useState(null);
	const [borderToSelectedUrl, setBorderToSelectedUrl] = useState(false);
	const [formData, setFormData] = useState({
		imageUrl: profileInfo.profilePicture,
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
		setIsLoading(true);
		if (profileInfo.user.name === "demouser") {
			setEditProfileError(
				"Unable to edit demouser, create a new account to utilize this feature"
			);
			return;
		}

		try {
			const data = await submitEditProfile({ formData }, profileInfo.id);
			if (data) {
				onClose();
				triggerRefresh();
			}
		} catch (error) {
			setEditProfileError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
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
					style={{
						backgroundColor: "black",
						border: "1px solid white",
						borderRadius: "10px",
						color: "white",
					}}
					type="text"
					value={formData.username}
					onChange={handleChange}
					placeholder={profileInfo.user.name}
					minLength="5"
					required
				/>
				<Button type="submit" text="Save" variant="saveButton" />
			</div>
			{editProfileError && (
				<div style={{ color: "white" }}>{editProfileError}</div>
			)}
			{isLoading && <CircularProgress color="white" />}
		</form>
	);
}

EditProfile.propTypes = {
	profileInfo: PropTypes.object,
	onClose: PropTypes.func,
};
