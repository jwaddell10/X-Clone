import "../Styles/Home.css";
import { useState } from "react";
import WelcomePage from "./WelcomePage/WelcomePage";
import { useAuth } from "../helpers/authContext";
import HomePage from "./HomePage/HomePage";

export default function Home() {
	const [action, setAction] = useState("");
	const { user } = useAuth();

	return (
		<main>
			{user ? (
				<HomePage />
			) : (
				<WelcomePage action={action} setAction={setAction} />
			)}
		</main>
	);
}
