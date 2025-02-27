const handleFollow = async (event, profileId, triggerRefresh) => {
	const loggedInUserId = localStorage.getItem("id");

	if (event.target.innerText === "Follow") {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/profile/${loggedInUserId}/${profileId}/follow`,
				{
					method: "POST",
				}
			);
			const data = await response.json();
			console.log(data, "data in response");
			triggerRefresh();
		} catch (error) {
            console.log(error, 'error')
			return error;
		}
	} else if (event.target.innerText === "Unfollow") {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/profile/${loggedInUserId}/${profileId}/unfollow`,
				{
					method: "DELETE",
				}
			);
			const data = await response.json();
			console.log(data, "data");
			triggerRefresh()
		} catch (error) {
			console.log(error, "error");
            return error;
		}
	}
};

export default handleFollow;
