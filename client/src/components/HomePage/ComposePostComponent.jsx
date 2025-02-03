import { useState } from "react";
import submitPost from "../../helpers/submitPost";
import Button from "../../helpers/Button";
import "../../Styles/ComposePostComponent.css";
import DisplayPost from "./DisplayPost";
import CircularProgress from "@mui/material/CircularProgress";

export default function ComposePostComponent() {
	const [text, setText] = useState("");
	const [error, setError] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleSubmit = async (event) => {
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

	const handleChange = (event) => {
		const postText = event.target.value;
		setText(postText);
		setIsDisabled(postText.trim() === "");
	};

	return (
		<span className="post-container">
			<div className="post-component-header-container">
				<li className="post-component-header">
					<button
						style={{
							backgroundColor: "black",
							width: "100%",
							color: "white",
							cursor: "pointer",
							border: "0px solid black"
						}}
					>
						All
					</button>
				</li>
				<li className="post-component-header">
					<button
						style={{
							backgroundColor: "black",
							width: "100%",
							color: "white",
							cursor: "pointer",
							border: "0px solid black"
						}}
					>
						Following
					</button>
				</li>
			</div>
			<div className="post-form-container">
				<form onSubmit={handleSubmit}>
					<div className="text-area-container">
						<textarea
							className="post-content"
							name="post-content"
							value={text}
							onChange={handleChange}
							placeholder="What is happening?!"
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
