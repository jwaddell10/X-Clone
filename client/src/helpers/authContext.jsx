import { useContext, useState, createContext } from "react";

export const AuthContext = createContext({
	user: false,
	login: () => {},
	logout: () => {},
	setUser: () => {},
});

export const AuthProvider = (props) => {
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [user, setUser] = useState(false);

	const login = () => {
		setUser(true);
		setRefreshTrigger((prevState) => prevState + 1);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(false);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout }}>
			{props}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext)
