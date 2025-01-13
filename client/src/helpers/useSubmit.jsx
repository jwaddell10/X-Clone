import { useState } from "react";
import postFormData from "./postFormData";
import { useAuth } from "./authContext";

export default function useSubmit(handleSubmit, url) {
	const { setUser } = useAuth()
	// const { handleSubmit } = useForm();
	const [error, setError] = useState("");

	const formHandler = handleSubmit(async (data) => {
		try {
			const response = await postFormData(data, url);
			if (!response.ok) {
				setError(response.message);
			} else setUser(true)
		} catch (error) {
			setError(error);
		}
	});

	return { error, formHandler };
}
