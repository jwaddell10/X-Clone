import "../Styles/Button.css"

export default function Button({text, variant}) {
    return (
        <button className="auth-form-button" id={variant}>{text}</button>
    )
}