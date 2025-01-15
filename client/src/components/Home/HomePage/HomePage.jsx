import ComposePostComponent from "./ComposePostComponent";
import SideNavigation from "./SideNavigation";

export default function HomePage() {
	const id = localStorage.getItem("id")

	return (
		<>
			<SideNavigation />
			<ComposePostComponent />
		</>
	);
}
