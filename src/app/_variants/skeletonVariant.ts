const skeletonVariant = {
	initial: {
		opacity: 0
	},
	animate: {
		opacity: [0.2, 1, 0.2],
		transition: {
			repeat: Infinity,
			ease: "easeInOut",
			duration: 1.5
		}
	}
}

export default skeletonVariant