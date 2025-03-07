const handleFollow = async (event, profileId) => {
	const loggedInUserId = localStorage.getItem("id");
	const JWTToken = localStorage.getItem("token");

	if (event.target.innerText === "Follow") {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/profile/${loggedInUserId}/${profileId}/follow`,
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${JWTToken}`,
					},
					method: "POST",
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error, "error");
			return error;
		}
	} else if (event.target.innerText === "Unfollow") {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/profile/${loggedInUserId}/${profileId}/unfollow`,
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${JWTToken}`,
					},
					method: "DELETE",
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error, "error");
			return error;
		}
	}
};

export default handleFollow;
