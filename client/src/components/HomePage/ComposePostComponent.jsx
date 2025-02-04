import { useState } from "react";
import submitPost from "../../helpers/submitPost";
import Button from "../../helpers/Button";
import "../../Styles/ComposePostComponent.css";
import DisplayPost from "./DisplayPost";
import CircularProgress from "@mui/material/CircularProgress";

export default function ComposePostComponent({ profile, refreshTrigger, setRefreshTrigger }) {
	const [text, setText] = useState("");
	const [error, setError] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const handlePostSubmit = async (event) => {
		event.preventDefault();
		if (text.trim() === "") {
			return;
		}

		try {
			setIsLoading(true);
			setIsDisabled(true);
			await submitPost(text, "post");
		} catch (error) {
			setError(error);
		} finally {
			setRefreshTrigger((prevState) => prevState + 1);
			setIsLoading(false);
		}
	};

	const handlePostFormChange = (event) => {
		const postText = event.target.value;
		setText(postText);
		setIsDisabled(postText.trim() === "");
	};

	return (
		<span className="post-container">
			<div className="post-component-header-container">
				<span className="post-component-header">
					<button
						style={{
							backgroundColor: "black",
							width: "100%",
							color: "white",
							cursor: "pointer",
							border: "0px solid black",
						}}
					>
						All
					</button>
				</span>
				<span className="post-component-header">
					<button
						style={{
							backgroundColor: "black",
							width: "100%",
							color: "white",
							cursor: "pointer",
							border: "0px solid black",
						}}
					>
						Following
					</button>
				</span>
			</div>
			<div className="post-form-container">
				<form onSubmit={handlePostSubmit}>
					<div className="text-area-container">
						{profile && (
							<img
							className="profile-picture-icon"
								src={profile.profilePicture}
								alt="profile-picture"
							/>
						)}
						<textarea
							className="post-content"
							name="post-content"
							value={text}
							onChange={handlePostFormChange}
							placeholder="What is happening?!"
							maxLength={280}
						></textarea>
						<div className="post-button-container">
							<Button
								type="submit"
								text="Post"
								variant="postButton"
								disabled={isDisabled}
							/>
						</div>
					</div>
					{isLoading && <CircularProgress color="white" />}
				</form>
			</div>
			<DisplayPost refreshTrigger={refreshTrigger} />
			{error && <div>{error}</div>}
		</span>
	);
}
