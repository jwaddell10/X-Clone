import { useState, useEffect } from "react";

export default function useFetchComments(postId) {
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {

        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/post/${postId}/comment`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                setComments(data.comments);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    return { comments, loading, error };
}