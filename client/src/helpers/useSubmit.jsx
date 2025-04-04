import { useState } from "react";
import postFormData from "./postFormData";
import { useAuth } from "./authContext";

export default function useSubmit(handleSubmit, url) {
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const formHandler = handleSubmit(async (data) => {
		setIsLoading(true);
		setError("");
		try {
			const postData = await postFormData(data, url);
			if (postData.token) {
				localStorage.setItem("token", postData.token);
				localStorage.setItem("id", postData.id);
				login();
			} else {
				setError(postData.message);
			}
		} catch (error) {
			setError(error.message || "An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	});

	return { error, isLoading, formHandler };
}
