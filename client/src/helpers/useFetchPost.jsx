import { useEffect, useState } from "react";

export default function useFetchPost(username, postId) {
	const [post, setPost] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/${username}/${postId}`
				);
				const data = await response.json();
				setPost(data.post);
			} catch (error) {
				setError(error);
			}
		};
		fetchPost();
	}, [postId, username]);

	return { post, error };
}
