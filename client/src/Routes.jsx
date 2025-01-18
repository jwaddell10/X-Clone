import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Profile from "./components/HomePage/Profile";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/profile/:id" element={<Profile />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
