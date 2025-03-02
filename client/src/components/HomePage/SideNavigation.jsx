import { useState, useRef } from "react";
import XIcon from "@mui/icons-material/X";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import "../../Styles/SideNavigation.css";
import { Link } from "react-router";
import PropTypes from "prop-types";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function SideNavigation({ profileInfo }) {
	const loggedInUserId = localStorage.getItem("id");
	const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
	const anchorRef = useRef(null);

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
				<Link>
					<li className="nav-item">
						<SearchSharpIcon className="icons" fontSize="large" />
						<span className="nav-text">Explore</span>
					</li>
				</Link>
				<Link>
					<li className="nav-item">
						<NotificationsNoneIcon
							className="icons"
							fontSize="large"
						/>
						<span className="nav-text">Notifications</span>
					</li>
				</Link>
				<Link>
					<li className="nav-item">
						<MailOutlineSharpIcon
							className="icons"
							fontSize="large"
						/>
						<span className="nav-text">Messages</span>
					</li>
				</Link>
				<Link to={`/profile/${loggedInUserId}`}>
					<li className="nav-item">
						<PermIdentityIcon className="icons" fontSize="large" />
						<span className="nav-text">Profile</span>
					</li>
				</Link>
				<Link>
					<li className="nav-item">
						<MoreHorizSharpIcon
							className="icons"
							fontSize="large"
						/>
						<span className="nav-text">Settings</span>
					</li>
				</Link>
				<button className="side-nav-post-button">Post</button>
				{profileInfo && (
					<div
						ref={anchorRef}
						style={{ display: "flex", cursor: "pointer" }}
						onClick={handleLogoutPopupToggle}
					>
						<img
							className="profile-picture-icon"
							src={profileInfo.profilePicture}
							alt="profile-picture"
						/>
						<div style={{ color: "white" }}>
							{profileInfo.user.name}
						</div>
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
	refreshTrigger: PropTypes.number,
};
