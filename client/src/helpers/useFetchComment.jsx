import { useEffect, useState } from "react";

export default function useFetchComment(username, commentId, refreshTrigger) {
	const [comment, setComment] = useState();
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	useEffect(() => {
		const fetchComment = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/comment/${username}/${commentId}`
				);
				const data = await response.json();
				setComment(data.comment);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchComment();
	}, [commentId, username, refreshTrigger]);

	return { comment, loading, error };
}
