import { useState, useContext } from "react";
import submitReply from "../../helpers/submitReply";
import Button from "../../helpers/Button";
import "../../Styles/ComposePost.css";
import CircularProgress from "@mui/material/CircularProgress";
import { RefreshContext } from "../../context/refreshTriggerContext";

export default function ComposeReply({ profilePicture, postId, commentId }) {
	const { triggerRefresh } = useContext(RefreshContext);
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
			
            if (commentId === undefined) {
				await submitReply(text, postId, null);
			} else await submitReply(text, postId, commentId);
		} catch (error) {
			setError(error);
		} finally {
			triggerRefresh();
			setIsLoading(false);
            setText("")
		}
	};

	const handlePostFormChange = (event) => {
		const postText = event.target.value;
		setText(postText);
		setIsDisabled(postText.trim() === "");
	};

	return (
		<span>
			<div className="post-form-container">
				<form
					style={{ borderTop: "1px solid gray" }}
					onSubmit={handlePostSubmit}
				>
					<div className="text-area-container">
						{profilePicture && (
							<img
								className="profile-picture-icon"
								src={profilePicture}
								alt="profile-picture"
							/>
						)}
						<textarea
							className="post-content"
							name="post-content"
							value={text}
							onChange={handlePostFormChange}
							placeholder="Post your reply"
							maxLength={280}
						></textarea>
					</div>
					<div className="post-button-container">
						<Button
							type="submit"
							text="Reply"
							variant="postButton"
							disabled={isDisabled}
						/>
					</div>
					{isLoading && <CircularProgress color="white" />}
				</form>
			</div>
			{error && <div>{error}</div>}
		</span>
	);
}
