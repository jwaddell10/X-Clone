import Button from "../../../helpers/Button";
import "../../../Styles/ComposePostComponent.css"

export default function ComposePostComponent() {
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
				<textarea className="post-content" name="" placeholder="What is happening?!"></textarea>
				<Button text="Post" variant="postButton">
					Test
				</Button>
			</div>
		</div>
	);
}
