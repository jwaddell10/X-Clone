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

	const { error, isLoading, formHandler } = useSubmit(handleSubmit, "signup");

	return (
		<form onSubmit={formHandler} className="signup-login-form">
			<CloseIcon
				onClick={() => setAction("")}
				style={{
					color: "#FFFFFF",
					cursor: "pointer",
					position: "absolute",
					top: "10px",
					right: "10px",
				}}
			/>
			<h1 className="form-header">Create your account</h1>
			<input
				className="form-input"
				type="text"
				{...register("username", { required: "Username is required" })}
				placeholder="Username"
				autoComplete="username"
			/>
			{errors.username && (
				<div style={{ color: "#E0245E", marginBottom: "10px" }}>
					{errors.username.message}
				</div>
			)}
			<input
				className="form-input"
				type="password"
				{...register("password", { required: "Please enter password" })}
				placeholder="Password"
				autoComplete="new-password"
			/>
			{errors.password && (
				<div style={{ color: "#E0245E", marginBottom: "10px" }}>
					{errors.password.message}
				</div>
			)}
			<input
				className="form-input"
				type="password"
				{...register("confirmPassword", {
					required: "Please enter password",
					validate: (value) =>
						value === watch("password") ||
						"Password does not match",
				})}
				placeholder="Confirm Password"
				autoComplete="confirm-password"
			/>
			{errors.confirmPassword && (
				<div style={{ color: "#E0245E", marginBottom: "10px" }}>
					{errors.confirmPassword.message}
				</div>
			)}
			{error && (
				<div style={{ color: "#E0245E", marginBottom: "10px" }}>
					{error}
				</div>
			)}
			<button className="form-button" type="submit" disabled={isLoading}>
				{isLoading ? "Signing up..." : "Sign up"}
			</button>
		</form>
	);
}

Signup.propTypes = {
	setAction: PropTypes.func.isRequired,
};
