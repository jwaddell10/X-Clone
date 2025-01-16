import "../../Styles/Button.css";

export default function HomeAuthButton({ text, variant, action, setAction }) {
	const handleClick = () => {
		setAction(action);
	};
	return (
		<button className="auth-form-button" id={variant} onClick={handleClick}>
			{text}
		</button>
	);
}
