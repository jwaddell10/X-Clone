import { useState, useEffect } from "react";

export default function useFetchPosts(refreshTrigger) {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/post`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data = await response.json();
				setPosts(data.sortedPosts);
			} catch (err) {
				console.error(err.message);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [refreshTrigger]);

	return { posts, loading, error };
}
