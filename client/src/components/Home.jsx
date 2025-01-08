import "../Styles/Home.css";
import Button from "./Button";
import GoogleButton from "./GoogleButton";
import { useState } from "react";
import LoginSignup from "./LoginSignup";

export default function Home() {
	const [action, setAction] = useState("");
	return (
		<main>
			<title>OdinBook Project</title>
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
					<Button
						text="Create Account"
						variant="signin-login-button"
						action="Signup"
						setAction={setAction}
					/>
					<Button
						text="Log In"
						variant="signin-login-button"
						action="Login"
						setAction={setAction}
					/>
					<Button text="Sign In as Guest" variant="outlined" />
                    
					{/* action determines if login or signup is rendered onClick */}
					{action && (
						<LoginSignup action={action} setAction={setAction} />
					)}
				</span>
			</section>
		</main>
	);
}
