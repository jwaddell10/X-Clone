import { useState, useEffect } from "react";

export default function useFetchPosts() {
    const [posts, setPosts] = useState(null)
    const [followerPosts, setFollowerPosts] = useState(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}`)
    })
}