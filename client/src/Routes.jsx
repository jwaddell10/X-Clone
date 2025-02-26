import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Profile from "./components/HomePage/Profile";
import PostDetails from "./components/HomePage/DisplayPostComponents/PostDetails";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/profile/:profileId" element={<Profile />}></Route>
				<Route
					path="/:username/:postId"
					element={<PostDetails />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}
