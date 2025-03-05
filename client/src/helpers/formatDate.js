import { formatDistanceToNow, parseISO, format } from "date-fns";

export default function formatDate(dateString) {
	const date = parseISO(dateString);
	const now = new Date();

	const daysDifference = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

	if (daysDifference < 7) {
		const relativeTime = formatDistanceToNow(date, { addSuffix: true });
		return relativeTime
			.replace("less than a minute ago", "now")
			.replace(/ minutes? ago/, "m")
			.replace(/ hours? ago/, "h")
			.replace(/ days? ago/, "d");
	}


	return format(date, "MMM d");
}
