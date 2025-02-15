import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Profile from "./components/HomePage/Profile";
// import { useAuth } from "./helpers/authContext";

export default function Router() {
	// const { user } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				{/* {user ? (
					<Route index element={<HomePage />} />
				) : (
					<Route element={<WelcomePage />} />
				)} */}
				<Route index element={<Home />} />
				<Route path="/profile/:id" element={<Profile />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
