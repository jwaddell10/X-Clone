import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Profile from "./components/HomePage/Profile";
import Post from "./components/HomePage/DisplayPostComponents/Post";

export default function Router() {

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/profile/:id" element={<Profile />}></Route>
				<Route
					path="/:username/:postId"
					element={<Post />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}
