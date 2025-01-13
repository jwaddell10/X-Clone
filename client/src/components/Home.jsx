import "../Styles/Home.css";
import { useState } from "react";
import SignInPage from "./SignInPage";
import { useAuth } from "../helpers/authContext";
import Main from "./Main";

export default function Home() {
	const [action, setAction] = useState("");
	const { user } = useAuth();
	console.log(user, 'user in useauthhome')

	return (
		<main>
			{user ? <Main /> : <SignInPage action={action} setAction={setAction}/>}
		</main>
	);
}
