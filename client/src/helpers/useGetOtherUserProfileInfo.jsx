import { useEffect, useState } from "react";

export default function useGetLoggedInUserProfileInfo(refreshTrigger, profileId) {
	const [profileInfo, setProfileInfo] = useState();
	const [error, setError] = useState("");
	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/profile/${profileId}`
				);
				const data = await response.json();

				if (data.errorMessage) {
					setError(data.errorMessage);
				}
				setProfileInfo(data.profile);
			} catch (error) {
				setError(error);
			}
		};
		fetchProfileInfo();
	}, [refreshTrigger, profileId]);

	return { profileInfo, error };
}
