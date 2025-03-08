import { createContext, useState } from "react";
import PropTypes from "prop-types";
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

RefreshProvider.propTypes = {
	children: PropTypes.object,
};