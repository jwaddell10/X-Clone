export function getItemsInAscendingOrderAndClosestToNowFirst(obj) {
	if (!obj || typeof obj !== "object") return obj;

	const time = Date.now();

	const sortedChildren = [...(obj.children || [])].sort((a, b) => {
		const aTime = new Date(a.createdAt).getTime();
		const bTime = new Date(b.createdAt).getTime();

		const aDelta = Math.abs(time - aTime);
		const bDelta = Math.abs(time - bTime);

		return aDelta - bDelta;
	});

	return {
		...obj,
		children: sortedChildren
	};
}

