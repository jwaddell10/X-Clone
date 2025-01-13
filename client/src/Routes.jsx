import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />}/>
			</Routes>
		</BrowserRouter>
	);
}
