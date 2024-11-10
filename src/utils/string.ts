const capitalize = (s?: string) => {
	if (s === undefined) return ''
	return s.slice(0, 1).toUpperCase() + s.slice(1)
}

export {
	capitalize
}