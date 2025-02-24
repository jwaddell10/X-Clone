import { useEffect } from "react";
import "./App.css";
import Router from "./Routes";
import { useAuth } from "./helpers/authContext";
import tokenActive from "./helpers/tokenActive";
import { RefreshProvider } from "./context/refreshTriggerContext";

function App() {
	const { user, setUser } = useAuth();
	useEffect(() => {
		const JWTToken = localStorage.getItem("token");
		setUser(tokenActive(JWTToken));
	}, [setUser, user]);
	return (
		<RefreshProvider>
			<Router />
		</RefreshProvider>
	);
}

export default App;
