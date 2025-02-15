import { useEffect, useState } from "react";

export default function useFetchPost(isLiked, postId) {
    const [post, setPost] = useState();
    const [error, setError] = useState();

    console.log(postId, 'post id in usefetch')

    // useEffect(() => {
    //     try {
    //         const fetchPost = async () => {
    //             const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${postId}`)
    //         }
    //     } catch (error) {
            
    //     }
    // })
}