import { useState } from "react";
import submitPost from "../../helpers/submitPost";
import Button from "../../helpers/Button";
import "../../Styles/ComposePostComponent.css";
import DisplayPost from "./DisplayPostComponents/DisplayPost";
import CircularProgress from "@mui/material/CircularProgress";

export default function ComposePostComponent({
	profileInfo,
	refreshTrigger,
	setRefreshTrigger,
}) {
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
			{/* <div className="post-component-header-container">
				<span className="post-component-header">
					<StyledButton>All</StyledButton>
				</span>
				<span className="post-component-header">
					<StyledButton>Following</StyledButton>
				</span>
			</div> */}
			<div className="post-form-container">
				<form onSubmit={handlePostSubmit}>
					<div className="text-area-container">
						{profileInfo && (
							<img
								className="profile-picture-icon"
								src={profileInfo.profilePicture}
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
					</div>
					<div className="post-button-container">
						<Button
							type="submit"
							text="Post"
							variant="postButton"
							disabled={isDisabled}
						/>
					</div>
					{isLoading && <CircularProgress color="white" />}
				</form>
			</div>
			<DisplayPost refreshTrigger={refreshTrigger} />
			{error && <div>{error}</div>}
		</span>
	);
}

// const StyledButton = styled.button`
// 	background-color: black;
// 	color: white;
// 	border: 0px solid black;
// 	cursor: pointer;
// 	&:focus {
// 		border-bottom: 0.3rem solid rgb(29, 155, 240);
// 		border-radius: 3px;
// 	}
// `;

// const StyledButton = styled.button`
// 	&:active {
// 		text-decoration: underline;
// 	}
// `;
