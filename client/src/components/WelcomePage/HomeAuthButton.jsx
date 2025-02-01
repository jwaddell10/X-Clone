import "../../Styles/Button.css";
import PropTypes from "prop-types";

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

HomeAuthButton.propTypes = {
	text: PropTypes.string,
	variant: PropTypes.string,
	action: PropTypes.string,
	setAction: PropTypes.func,
};
