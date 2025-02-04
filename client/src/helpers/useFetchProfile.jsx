import { useState, useEffect } from "react";

export default function useFetchProfile(id) {
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/profile/${id}`
				);
				const data = await response.json();
                setProfile(data)
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProfileInfo();
	}, [id]);

    return { profile, error, isLoading }
}
