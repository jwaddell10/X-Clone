import "../Styles/Button.css"

export default function Button({ text, variant, disabled }) {
	return <button className={variant} disabled={disabled}>{text}</button>;
}
