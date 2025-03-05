export function getItemsInAscendingOrderAndClosestToNowFirst(arr) {
	const time = Date.now();
    
    const entries = [...Object.values(arr)]

    const [closest, ...rest] = Array.from(entries).sort((a, b) => {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();

        const aDelta = Math.abs(time - aTime)
        const bDelta = Math.abs(time - bTime)

        return (aDelta - bDelta)
    })

	return [
		closest,
		...rest
			// sort all other items in ascending date order.
			.sort(
				(a, b) =>
					new Date(a.effectiveDate).getTime() -
					new Date(b.effectiveDate).getTime()
			),
	];

}
