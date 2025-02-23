import GoogleButton from "./GoogleButton";
import HomeAuthButton from "./HomeAuthButton";
import Login from "./Login";
import Signup from "./Signup";
import "../../Styles/WelcomePage.css";
import PropTypes from "prop-types";

export default function WelcomePage({ action, setAction }) {
	return (
		<>
			<title>OdinBook Project</title>
			<div className="homepage-container" style={{display: "flex"}}>
				<img
					className="x-logo"
					src="../src/assets/X_logo.jpg"
					alt="X logo"
				/>
				<section>
					<h1 className="homepage-header">Happening now</h1>
					<h2 className="homepage-header">Join today.</h2>
					<span className="buttons">
						<div className="google-button-container">
							<GoogleButton
								text="Continue with Google"
								variant="google-button"
							/>
						</div>
						<h3
							style={{
								color: "white",
								display: "flex",
								justifyContent: "center",
							}}
						>
							or
						</h3>
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
				</section>
			</div>
		</>
	);
}

WelcomePage.propTypes = {
	action: PropTypes.string,
	setAction: PropTypes.func,
};
