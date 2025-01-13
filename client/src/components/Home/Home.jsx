import "../../Styles/Home.css";
import { useState } from "react";
import WelcomePage from "./WelcomePage/WelcomePage";
import { useAuth } from "../../helpers/authContext";
import Main from "./HomePage/HomePage";

export default function Home() {
	const [action, setAction] = useState("");
	const { user } = useAuth();

	return (
		<main>
			{user ? <Main /> : <WelcomePage action={action} setAction={setAction}/>}
		</main>
	);
}
