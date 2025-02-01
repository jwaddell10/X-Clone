import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import "../../Styles/LoginSignup.css";
import useSubmit from "../../helpers/useSubmit";
import PropTypes from "prop-types";

export default function Signup({ setAction }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const { error, formHandler } = useSubmit(handleSubmit, "signup");
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

	const confirmPasswordRegistered = {
		...register("confirmPassword", {
			required: "Please enter password",
			validate: (value) => {
				return value === watch("password") || "Password does not match";
			},
		}),
	};

	return (
		<>
			<form onSubmit={formHandler} className="signup-login-form">
				<CloseIcon
					onClick={() => {
						setAction("");
					}}
				/>
				<h1>Create your account</h1>
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
					autoComplete="new-password"
				/>
				{errors.password && <div>{errors.password.message}</div>}
				<input
					type="password"
					{...confirmPasswordRegistered}
					placeholder="Confirm Password"
					autoComplete="confirmPassword"
				/>
				{errors.confirmPassword && (
					<div>{errors.confirmPassword.message}</div>
				)}
				{error && <div>{error}</div>}
				<button type="submit">Sign up</button>
			</form>
		</>
	);
}

Signup.propTypes = {
	setAction: PropTypes.func,
};
