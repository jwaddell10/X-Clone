import "../Styles/Button.css"

export default function Button({ text, variant }) {
	return <button className={variant}>{text}</button>;
}
