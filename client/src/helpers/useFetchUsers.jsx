import { useState, useEffect } from "react";

export default function useFetchUsers(url) {
	const [users, setUsers] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/${url}`
				);

				if (!response.ok) {
					setError("An error has occurred. Try again later");
				}

				const data = await response.json();
				if (data.errorMessage) {
					setError(data.errorMessage);
				}
				setUsers(data.users);
				setIsLoading(false);
			} catch (error) {
				setError(error);
			}
		};
		fetchUsers();
	}, [url]);

	return { users, isLoading, error };
	//fetch users, return username and profile picture
}
