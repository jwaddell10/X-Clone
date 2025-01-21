import { useState } from "react";
import submitPost from "../../helpers/submitPost";
import Button from "../../helpers/Button";
import "../../Styles/ComposePostComponent.css";
import DisplayPost from "./DisplayPost";

export default function ComposePostComponent() {
	const [text, setText] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (text.trim() === "") {
			return;
		}
		await submitPost(text, "post");
	};

	const handleChange = (event) => {
		const postText = event.target.value;
		setText(postText);
		setIsDisabled(postText.trim() === "");
	};

	return (
		<div>
			<div className="post-component-header-container">
				<li className="post-component-header">
					<button>All</button>
				</li>
				<li className="post-component-header">
					<button>Following</button>
				</li>
			</div>
			<div className="post-form-container">
				<form onSubmit={handleSubmit}>
					<textarea
						className="post-content"
						name="post-content"
						value={text}
						onChange={handleChange}
						placeholder="What is happening?!"
					></textarea>
					<Button
						type="submit"
						text="Post"
						variant="postButton"
						disabled={isDisabled}
					/>
				</form>
			</div>
			<DisplayPost />
		</div>
	);
}
