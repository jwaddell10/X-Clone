import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import postFormData from "../helpers/postFormData";
import "../Styles/LoginSignup.css";

export default function Login({ action, setAction }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const usernameRegistered = {
		...register("username", {
			required: "Username is required",
			minLength: {
				value: 5,
				message: "Username must be at least 5 characters",
			},
			maxLength: {
				value: 20,
				message: "Username must not exceed 20 characters",
			},
		}),
	};

	const passwordRegistered = {
		...register("password", {
			required: "Please enter password",
		}),
	};

	return (
		<form
			onSubmit={handleSubmit((data) => {
				postFormData(data, "login");
			})}
			className="signup-login-form"
		>
			<CloseIcon
				onClick={() => {
					setAction("");
				}}
			/>
			<h1>Login</h1>
			<input
				type="text"
				{...usernameRegistered}
				placeholder="Username"
				autoComplete="username"
			/>
			{errors.username && <div>{errors.username.message}</div>}
			<input
				type="password"
				{...passwordRegistered}
				placeholder="Password"
				autoComplete="current-password"
			/>
			{errors.password && <div>{errors.password.message}</div>}
			<button type="submit">Log in</button>
		</form>
	);
}
