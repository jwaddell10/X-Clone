import { useContext, useEffect } from "react";
import { RefreshContext } from "../../context/refreshTriggerContext";
import loginGuest from "../../helpers/loginGuest";

export default function LoginGuest() {
	const { refreshTrigger, triggerRefresh } = useContext(RefreshContext);
	useEffect(() => {
		loginGuest();
		triggerRefresh();
	}, [refreshTrigger, triggerRefresh]);
}
