import { useState } from "react";
import postFormData from "./postFormData";

export default function useSubmit(handleSubmit, url) {
	// const { handleSubmit } = useForm();
	const [error, setError] = useState("");

	const formHandler = handleSubmit(async (data) => {
		try {
			const response = await postFormData(data, url);
			if (!response.ok) {
				setError(response.message);
			}
		} catch (error) {
			setError(error);
		}
	});

	return { error, formHandler };
}
