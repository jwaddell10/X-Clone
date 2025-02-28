import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Profile from "./components/HomePage/Profile";
import PostDetails from "./components/HomePage/DisplayPostComponents/PostDetails";
import CommentDetails from "./components/HomePage/DisplayPostComponents/CommentDetails";

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
				<Route
					path="/comment/:username/:commentId"
					element={<CommentDetails />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}
