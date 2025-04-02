import { useState, useContext } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import submitPost from "../../helpers/submitPost";
import Button from "../../helpers/Button";
import "../../Styles/ComposePost.css";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { PostModalContext } from "../../context/PostModalContext";

export default function ComposePost({ profileInfo }) {
	const { triggerRefresh } = useContext(RefreshContext);

	const { setIsReplyModalOpen } = useContext(PostModalContext);
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
			const data = await submitPost(text, "post");
			if (data.createdPost) {
				setIsReplyModalOpen(false);
			}
		} catch (error) {
			setError(error);
		} finally {
			triggerRefresh();
			setIsLoading(false);
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
			{error && <div>{error}</div>}
		</span>
	);
}

ComposePost.propTypes = {
	profileInfo: PropTypes.object,
};
