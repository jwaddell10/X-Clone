import HomeAuthButton from "./HomeAuthButton";
import Login from "./Login";
import Signup from "./Signup";
import "../../Styles/WelcomePage.css";
import PropTypes from "prop-types";

export default function WelcomePage({ action, setAction }) {
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
						<HomeAuthButton
							text="Enter as Guest"
							variant="outlined"
						/>
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