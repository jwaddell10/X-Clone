import { useState } from "react"; // Import useState
import HomeAuthButton from "./HomeAuthButton";
import Login from "./Login";
import Signup from "./Signup";
import "../../Styles/WelcomePage.css";
import PropTypes from "prop-types";
import loginGuest from "../../helpers/loginGuest";

export default function WelcomePage({ action, setAction }) {
	const [error, setError] = useState("");

	const handleGuestLogin = async () => {
		try {
			setError("");
			const data = await loginGuest();
			if (data) {
				setAction("");
				window.location.reload();
			}
		} catch (err) {
			setError(err.message || "An error occurred during guest login");
		}
	};

	return (
		<div className="welcome-page">
			<title>OdinBook Project</title>
			<img
				className="x-logo-welcome-page"
				src="../src/assets/X_logo.jpg"
				alt="X logo"
			/>
			<div className="homepage-container">
				<span>
					<h1 className="homepage-header">Happening now</h1>
					<h2 className="homepage-header">Join today.</h2>
					<span className="buttons">
						<HomeAuthButton
							text="Create Account"
							variant="signin-login-button"
							action="Signup"
							setAction={setAction}
						/>
						<HomeAuthButton
							text="Log In"
							variant="signin-login-button"
							action="Login"
							setAction={setAction}
						/>
						<button
							className="guest-login-button"
							onClick={handleGuestLogin}
							style={{
								marginTop: "10px",
								backgroundColor: "#000000",
								color: "#1DA1F2",
								padding: "10px 20px",
								borderRadius: "1em",
								border: "2px solid #1DA1F2",
								cursor: "pointer",
								fontWeight: "bold",
								transition: "all 0.3s ease-in-out",
							}}
						>
							Enter as Guest
						</button>

						{error && (
							<div
								style={{
									color: "red",
									marginTop: "10px",
									fontWeight: "bold",
								}}
							>
								{error}
							</div>
						)}
						{action === "Login" && (
							<Login action={action} setAction={setAction} />
						)}
						{action === "Signup" && (
							<Signup action={action} setAction={setAction} />
						)}
					</span>
				</span>
			</div>
		</div>
	);
}

WelcomePage.propTypes = {
	action: PropTypes.string,
	setAction: PropTypes.func,
};
