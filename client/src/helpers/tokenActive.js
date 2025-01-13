import { jwtDecode } from "jwt-decode";

export default function tokenActive(token) {
	try {
		const decodedToken = jwtDecode(token);

		if (!decodedToken.exp) {
			return false;
		}

		const isTokenValid = Date.now() <= decodedToken.exp * 1000;

		if (!isTokenValid) {
			localStorage.removeItem("token");
		}
		return isTokenValid;
	} catch (error) {
		console.error("Error decoding token:", error);
		return false;
	}
}