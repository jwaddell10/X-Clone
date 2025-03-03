export default function formatDateXStyle(date) {
	const now = new Date();
	const diffInSeconds = Math.floor((now - date) / 1000);

	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
	};

	if (diffInSeconds >= intervals.year) {
		const years = Math.floor(diffInSeconds / intervals.year);
		return `${years}y`;
	} else if (diffInSeconds >= intervals.month) {
		const months = Math.floor(diffInSeconds / intervals.month);
		return `${months}mo`;
	} else if (diffInSeconds >= intervals.week) {
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const month = monthNames[date.getMonth()];
		const day = date.getDate();
		return `${month} ${day}`;
	} else if (diffInSeconds >= intervals.day) {
		const days = Math.floor(diffInSeconds / intervals.day);
		return `${days}d`;
	} else if (diffInSeconds >= intervals.hour) {
		const hours = Math.floor(diffInSeconds / intervals.hour);
		return `${hours}h`;
	} else if (diffInSeconds >= intervals.minute) {
		const minutes = Math.floor(diffInSeconds / intervals.minute);
		return `${minutes}min`;
	} else {
		return "Just now";
	}
}
