import "../../Styles/Button.css";
import PropTypes from "prop-types";

export default function GoogleButton({ text, variant }) {
	return (
		<button className="auth-form-button" id={variant}>
			<img
				src="../src/assets/google_logo.jpg"
				alt="Google logo"
				style={{
					marginRight: "10px",
					width: "2rem",
					height: "2rem",
				}}
			/>
			{text}
		</button>
	);
}

GoogleButton.propTypes = {
	text: PropTypes.string,
	variant: PropTypes.string,
};
