export default async function loginGuest() {
	const guestUsername = "demouser";
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/auth/login`,
			{
				headers: {
					"Content-type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ guestUsername }),
			}
		);

		if (!response.ok) {
			const errorMessage = await response.text();
			throw new Error(errorMessage || "Unable to login Guest User");
		}

		const data = await response.json();
		if (data.token) {
			localStorage.setItem("token", data.token);
			localStorage.setItem("id", data.id);
			return data; // Return data after successful login
		} else {
			throw new Error("No token received from server");
		}
	} catch (error) {
		console.error("Guest login error:", error);
		throw error; // Throw error instead of returning it
	}
}


// export default function useSubmit(handleSubmit, url) {
//     const { login } = useAuth();
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const formHandler = handleSubmit(async (data) => {
//         setIsLoading(true);
//         setError("");
//         try {
//             const postData = await postFormData(data, url);
//             if (postData.token) {
//                 localStorage.setItem("token", postData.token);
//                 localStorage.setItem("id", postData.id);
//                 login();
//             } else {
//                 setError(postData.message);
//             }
//         } catch (error) {
//             setError(error.message || "An unexpected error occurred");
//         } finally {
//             setIsLoading(false);
//         }
//     });

//     return { error, isLoading, formHandler };
// }
