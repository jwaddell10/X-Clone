import { useForm } from "react-hook-form";
import { useState } from "react";
import postFormData from "./postFormData";

export default function useSubmit(url) {
	const { handleSubmit } = useForm();
	const [error, setError] = useState("");

	const formHandler = handleSubmit(async (data) => {
		try {
			const response = await postFormData(data, url);
			console.log(response, "response");
			if (!response.ok) {
				setError(response.message);
			}
		} catch (error) {
			setError(error);
		}
	});

	return { error, formHandler };
}
