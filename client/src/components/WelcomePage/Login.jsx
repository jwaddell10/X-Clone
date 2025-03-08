import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import "../../Styles/LoginSignup.css";
import useSubmit from "../../helpers/useSubmit";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import loginGuest from "../../helpers/loginGuest";

export default function Login({ action, setAction }) {
	// if (action === "LoginGuest") {
	// 	const handleGuestLogin = async () => {
	// 		try {
	// 			await loginGuest();
	// 			setAction("");
	// 		} catch (error) {
	// 			console.log(error, "error");
	// 		}
	// 	};
	// 	handleGuestLogin();
	// }
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { error, isLoading, formHandler } = useSubmit(handleSubmit, "login");

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
		<form onSubmit={formHandler} className="signup-login-form">
			<CloseIcon
				onClick={() => {
					setAction("");
				}}
				style={{
					color: "#FFFFFF",
					cursor: "pointer",
					position: "absolute",
					top: "10px",
					right: "10px",
				}}
			/>
			<h1 className="form-header">Login</h1>
			<input
				className="form-input"
				type="text"
				{...usernameRegistered}
				placeholder="Username"
				autoComplete="username"
				style={{
					width: "100%",
					padding: "10px",
					marginBottom: "10px",
					borderRadius: "8px",
					border: "1px solid #38444D",
					backgroundColor: "#192734",
					color: "#FFFFFF",
					outline: "none",
				}}
			/>
			{errors.username && (
				<div style={{ color: "#E0245E", marginBottom: "10px" }}>
					{errors.username.message}
				</div>
			)}
			<input
				className="form-input"
				type="password"
				{...passwordRegistered}
				placeholder="Password"
				autoComplete="current-password"
			/>
			{errors.password && (
				<div style={{ color: "#E0245E", marginBottom: "10px" }}>
					{errors.password.message}
				</div>
			)}
			{error && (
				<div style={{ color: "#E0245E", marginBottom: "10px" }}>
					{error}
				</div>
			)}
			{isLoading ? (
				<CircularProgress style={{ color: "#1DA1F2" }} />
			) : (
				<button className="form-button" type="submit">
					Sign in
				</button>
			)}
		</form>
	);
}

Login.propTypes = {
	setAction: PropTypes.func,
};
