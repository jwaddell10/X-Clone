import "../Styles/Home.css";
import { useState } from "react";
import WelcomePage from "./WelcomePage/WelcomePage";
import { useAuth } from "../helpers/authContext";
import HomePage from "./HomePage/HomePage";

export default function Home() {
    const { user } = useAuth();
	const [action, setAction] = useState("");
	return (
		<section>
			{user ? (
				<HomePage />
			) : (
				<WelcomePage action={action} setAction={setAction} />
			)}
		</section>
	);
}
