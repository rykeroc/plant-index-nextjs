type ComparisonOrder = 'asc' | 'desc'

const stringCompare = (a: string, b: string, order: ComparisonOrder = 'asc') => {
	return order == 'asc' ? a.localeCompare(b) : b.localeCompare(a)
}

const monthCompare = (a: string, b: string) => {
	const months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];

	return months.indexOf(a) - months.indexOf(b)
}

export {
	monthCompare,
	stringCompare
}