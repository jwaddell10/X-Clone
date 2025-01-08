import CloseIcon from "@mui/icons-material/Close";
import "../Styles/LoginSignup.css";

export default function LoginSignup({ action, setAction }) {
	return (
		<>
			{action === "Signup" ? (
				<div className="signup-login-form">
					<CloseIcon
						onClick={() => {
							setAction("");
						}}
					/>
					<h1>Create your account</h1>
					<input type="text" placeholder="Username" />
					{/* <input type="email" placeholder="Email" /> */}
					<input type="password" placeholder="Password" />
					<input type="password" placeholder="Confirm Password" />
				</div>
			) : (
				<div className="signup-login-form">
					<CloseIcon
						onClick={() => {
							setAction("");
						}}
					/>
					<h1>Login</h1>
					<input type="text" placeholder="Username" />
					<input type="password" placeholder="Password" />
				</div>
			)}
		</>
	);
}
