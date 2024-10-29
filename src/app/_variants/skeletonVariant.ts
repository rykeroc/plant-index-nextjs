const skeletonVariant = {
	initial: {
		opacity: 0
	},
	animate: {
		opacity: [0.4, 1, 0.4],
		transition: {
			repeat: Infinity,
			ease: "easeInOut",
			duration: 1.5
		}
	}
}

export default skeletonVariant