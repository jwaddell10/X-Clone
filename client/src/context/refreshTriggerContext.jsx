import { createContext, useState } from "react";

// Create the context
export const RefreshContext = createContext();

// Create the provider component
export const RefreshProvider = ({ children }) => {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	// Function to trigger a refresh
	const triggerRefresh = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return (
		<RefreshContext.Provider value={{ refreshTrigger, triggerRefresh }}>
			{children}
		</RefreshContext.Provider>
	);
};