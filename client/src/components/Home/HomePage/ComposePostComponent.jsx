import { useState } from "react";
import submitPost from "../../../helpers/submitPost";
import Button from "../../../helpers/Button";
import "../../../Styles/ComposePostComponent.css";

export default function ComposePostComponent() {
	const [text, setText] = useState("");
	const handleSubmit = async (event) => {
		event.preventDefault();
		await submitPost(text, "post");
	};

	const handleChange = (event) => {
		setText(event.target.value);
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
			<div className="post-container">
				<form onSubmit={handleSubmit}>
					<textarea
						className="post-content"
						name="post-content"
						value={text}
						onChange={handleChange}
						placeholder="What is happening?!"
					></textarea>
					<Button type="submit" text="Post" variant="postButton" />
				</form>
			</div>
		</div>
	);
}
