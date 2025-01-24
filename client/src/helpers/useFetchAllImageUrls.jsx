import { useEffect, useState } from "react";

export default function useFetchAllImageUrls() {
	const [imageUrls, setImageUrls] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAllImageUrls = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/profile/image`
				);

                if (!response.ok) {
                    throw new Error("Failed to fetch image urls")
                }

				const data = await response.json();
				setImageUrls(data);
			} catch (error) {
				setError(error);
			}
		};
		fetchAllImageUrls();
	}, []);

	return { imageUrls, error };
}
