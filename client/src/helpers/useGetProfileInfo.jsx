import { useEffect, useState } from "react";

export default function useGetProfileInfo(refreshTrigger) {
	// const JWTToken = localStorage.getItem("token");
	const loggedInUserId = localStorage.getItem("id");
	const [profileInfo, setProfileInfo] = useState();
	const [error, setError] = useState("");
	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/profile/${loggedInUserId}`
				);
				const data = await response.json();

				if (data.errorMessage) {
					setError(data.errorMessage);
				}
				setProfileInfo(data.profile)
			} catch (error) {
				setError(error);
			}
		};
		fetchProfileInfo();
	}, [refreshTrigger, loggedInUserId]);

	return { profileInfo, error };
}
