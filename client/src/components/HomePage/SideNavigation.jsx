import XIcon from "@mui/icons-material/X";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import "../../Styles/SideNavigation.css";
import { Link } from "react-router";
import useGetProfileInfo from "../../helpers/useGetProfileInfo";

export default function SideNavigation() {
	const { profileInfo } = useGetProfileInfo();
	return (
		<section>
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
				{/* add profile id*/}
				{profileInfo && (
					<Link to={`/profile/${profileInfo.id}`}>
						<li className="nav-item">
							<PermIdentityIcon
								className="icons"
								fontSize="large"
							/>
							<span className="nav-text">Profile</span>
						</li>
					</Link>
				)}

				<Link>
					<li className="nav-item">
						<MoreHorizSharpIcon
							className="icons"
							fontSize="large"
						/>
						<span className="nav-text">Settings</span>
					</li>
				</Link>
				<button className="nav-item">Post</button>
			</span>
		</section>
	);
}

// const StyledNavItem = styled.link`
// 	display: flex;
// 	align-items: center;
// 	margin-top: 10px;
// 	margin-left: 6rem;
// 	gap: 1rem;
// `;
