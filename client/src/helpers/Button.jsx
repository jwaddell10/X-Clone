import "../Styles/Button.css";

export default function Button({ text, variant, disabled, type }) {
	return (
		<button type={type} className={variant} disabled={disabled}>
			{text}
		</button>
	);
}
