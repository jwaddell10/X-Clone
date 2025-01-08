import { Link } from "react-router";
import "../Styles/Home.css";
import Button from "./Button";
import GoogleButton from "./GoogleButton";

export default function Home() {
	return (
		<main>
			<title>OdinBook Project</title>
			<img
				className="x-logo"
				src="../src/assets/X_logo.jpg"
				alt="X logo"
			/>
			<section>
				<h1>Happening now</h1>
				<h2>Join today.</h2>
				<span className="buttons">
					<div className="google-button-container">
						<GoogleButton text="Continue with Google" variant="google-button" />
					</div>
                    <h3 style={{color: "white", display: "flex", justifyContent: "center"}}>or</h3>
					<Button
						text="Create Account"
						variant="signin-login-button"
					/>
					<Button text="Log In" variant="signin-login-button" />
					<Button text="Sign In as Guest" variant="outlined" />
				</span>
			</section>
		</main>
	);
}
