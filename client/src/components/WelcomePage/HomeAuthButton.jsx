import "../../Styles/Button.css";
import PropTypes from "prop-types";
import loginGuest from "../../helpers/loginGuest";

export default function HomeAuthButton({ text, variant, action, setAction }) {
	const handleClick = async (text) => {
		// if (text.target.innerText === "Enter as Guest") {
		// 	await loginGuest();
		// 	triggerRefresh();
		// }
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
