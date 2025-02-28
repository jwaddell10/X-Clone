import { useEffect, useState } from "react";

export default function useGetLoggedInUserProfileInfo(refreshTrigger) {
	// const JWTToken = localStorage.getItem("token");
	const id = localStorage.getItem("id");
	const [profileInfo, setProfileInfo] = useState();
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("");
	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/profile/${id}`
				);
				const data = await response.json();

				if (data.errorMessage) {
					setError(data.errorMessage);
				}
				setProfileInfo(data.profile)
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false)
			}
		};
		fetchProfileInfo();
	}, [refreshTrigger, id]);

	return { profileInfo, loading, error };
}
