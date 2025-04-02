import { useEffect } from "react";
import "./App.css";
import Router from "./Routes";
import { useAuth } from "./helpers/authContext";
import tokenActive from "./helpers/tokenActive";
import { RefreshProvider } from "./context/refreshTriggerContext";
import { PostModalProvider } from "./context/PostModalContext";

function App() {
	const { user, setUser } = useAuth();
	useEffect(() => {
		const JWTToken = localStorage.getItem("token");
		setUser(tokenActive(JWTToken));
	}, [setUser, user]);
	return (
		<PostModalProvider>
			<RefreshProvider>
				<Router />
			</RefreshProvider>
		</PostModalProvider>
	);
}

export default App;
