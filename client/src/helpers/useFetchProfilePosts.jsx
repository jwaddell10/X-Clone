import { useState, useEffect } from "react";

export default function useFetchProfilePosts(profileId) {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/profile/${profileId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                console.log(data, 'data from fetchprofileposts')
                setPosts(data.profilePosts);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [profileId]);

    return { posts, loading, error };
}