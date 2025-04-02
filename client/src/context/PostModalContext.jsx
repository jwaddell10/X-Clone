import { createContext, useState } from "react";
import PropTypes from "prop-types";
// Create the context

export const PostModalContext = createContext();

// Create the provider component
export const PostModalProvider = ({ children }) => {
	const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

	return (
		<PostModalContext.Provider
			value={{ isReplyModalOpen, setIsReplyModalOpen }}
		>
			{children}
		</PostModalContext.Provider>
	);
};

PostModalProvider.propTypes = {
	children: PropTypes.object,
};
