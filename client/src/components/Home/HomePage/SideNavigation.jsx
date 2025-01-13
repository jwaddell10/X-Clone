import XIcon from "@mui/icons-material/X";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import "../../../Styles/SideNavigation.css";

export default function SideNavigation() {
	return (
		<section>
			<span className="icons-container">
				<li className="nav-item">
					<XIcon className="icons" fontSize="large" />
				</li>
				<li className="nav-item">
					<HomeSharpIcon className="icons" fontSize="large" />
					<span className="nav-text">Home</span>
				</li>
				<li className="nav-item">
					<SearchSharpIcon className="icons" fontSize="large" />
					<span className="nav-text">Explore</span>
				</li>
				<li className="nav-item">
					<NotificationsSharpIcon
						className="icons"
						fontSize="large"
					/>
					<span className="nav-text">Notifications</span>
				</li>
				<li className="nav-item">
					<MailOutlineSharpIcon className="icons" fontSize="large" />
					<span className="nav-text">Messages</span>
				</li>
				<li className="nav-item">
					<PersonSharpIcon className="icons" fontSize="large" />
					<span className="nav-text">Profile</span>
				</li>
				<li className="nav-item">
					<MoreHorizSharpIcon className="icons" fontSize="large" />
					<span className="nav-text">Settings</span>
				</li>
			</span>
		</section>
	);
}
