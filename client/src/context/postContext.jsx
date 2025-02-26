import { createContext, useState } from "react"

export const PostContext = createContext();

export const PostContextProvider = ({children}) => {
    const [post, setPost] = useState('')

    const fetchPost = () => {
        
    }
}