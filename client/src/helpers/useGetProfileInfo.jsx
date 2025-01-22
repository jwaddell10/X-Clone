import { useEffect, useState } from "react";

export default function useGetProfileInfo() {
	// const JWTToken = localStorage.getItem("token");
	const id = localStorage.getItem("id");
	const [profileInfo, setProfileInfo] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProfileInfo = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/profile/${id}`
				);

				const data = await response.json();
				console.log(data, "data from fetch profile info");

				if (data.errorMessage) {
					setError(data.errorMessage);
				}
				return data;
			} catch (error) {
				setError(error);
			}
		};
		fetchProfileInfo();
	});

	return { profileInfo, setProfileInfo, error };
}
