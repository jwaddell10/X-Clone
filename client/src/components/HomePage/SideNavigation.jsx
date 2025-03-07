import { useState, useRef, useEffect } from "react";
import XIcon from "@mui/icons-material/X";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import "../../Styles/SideNavigation.css";
import { Link } from "react-router";
import PropTypes from "prop-types";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import ReplyModal from "../../helpers/ReplyModal";
import Paper from "@mui/material/Paper";

export default function SideNavigation({ profileInfo }) {
	const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

	const [replyModalFormData, setReplyModalFormData] = useState("");

	const handleOpenReplyFormModal = () => {
		setIsReplyModalOpen(true);
	};

	const handleCloseReplyFormModal = () => {
		setIsReplyModalOpen(false);
	};
	const loggedInUserId = localStorage.getItem("id");
	const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
	const anchorRef = useRef(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

	// Handle screen resize
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 769);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleFormSubmit = () => {
		console.log('handle form submit runs')
	}
	const handleLogoutPopupToggle = () => {
		setLogoutPopupOpen((prev) => !prev);
	};

	const handleLogoutPopupClose = () => {
		setLogoutPopupOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		window.location.href = "/";
	};

	return (
		<section className="sidebar-container">
			{isReplyModalOpen && (
							<ReplyModal
								isOpen={isReplyModalOpen}
								modalData={replyModalFormData}
								onSubmit={handleFormSubmit}
								onClose={handleCloseReplyFormModal}
							/>
						)}
			<span className="icons-container">
				<li className="nav-item">
					<Link>
						<XIcon className="icons" fontSize="large" />
					</Link>
				</li>
				<Link to="/">
					<li className="nav-item">
						<HomeSharpIcon className="icons" fontSize="large" />
						<span className="nav-text">Home</span>
					</li>
				</Link>
				<Link to={`/profile/${loggedInUserId}`}>
					<li className="nav-item">
						<PermIdentityIcon className="icons" fontSize="large" />
						<span className="nav-text">Profile</span>
					</li>
				</Link>

				<button onClick={handleOpenReplyFormModal} className="side-nav-post-button">
					{isMobile ? (
						<AddCircleOutlineRoundedIcon fontSize="large" />
					) : (
						"Post"
					)}
				</button>

				{profileInfo && (
					<div
						ref={anchorRef}
						style={{ display: "flex", cursor: "pointer", alignItems: "center", gap: "5px" }}
						onClick={handleLogoutPopupToggle}
					>
						{isMobile ? (
							<img
								className="profile-picture-icon"
								src={profileInfo.profilePicture}
								alt="profile-picture"
							/>
						) : (
							<>
								<img
									className="profile-picture-icon"
									src={profileInfo.profilePicture}
									alt="profile-picture"
								/>
								<div style={{ color: "white" }}>
									{profileInfo.user.name}
								</div>
							</>
						)}
					</div>
				)}
			</span>

			{/* Logout Popup */}
			<Popper
				open={logoutPopupOpen}
				anchorEl={anchorRef.current}
				placement="top"
				onClickAway={handleLogoutPopupClose}
				style={{ zIndex: 1300 }}
			>
				<Paper
					elevation={3}
					style={{
						padding: "16px",
						borderRadius: "8px",
						backgroundColor: "#15202B",
						color: "#FFFFFF",
					}}
				>
					<h3 style={{ margin: 0, color: "#FFFFFF" }}>Log out</h3>
					<p style={{ margin: "8px 0", color: "#8899A6" }}>
						Are you sure you want to log out?
					</p>
					<Button
						variant="contained"
						style={{
							backgroundColor: "#1DA1F2",
							color: "#FFFFFF",
							width: "100%",
							textTransform: "none",
						}}
						onClick={handleLogout}
						fullWidth
					>
						Log out
					</Button>
					<Button
						variant="outlined"
						style={{
							borderColor: "#38444D",
							color: "#FFFFFF",
							width: "100%",
							marginTop: "10px",
							textTransform: "none",
						}}
						onClick={handleLogoutPopupClose}
						fullWidth
					>
						Cancel
					</Button>
				</Paper>
			</Popper>
		</section>
	);
}

SideNavigation.propTypes = {
	profileInfo: PropTypes.shape({
		profilePicture: PropTypes.string.isRequired,
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
		}).isRequired,
	}),
};
