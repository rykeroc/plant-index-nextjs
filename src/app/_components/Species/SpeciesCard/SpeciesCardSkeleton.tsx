"use client"

import { motion } from "framer-motion"
import skeletonVariant from "@/app/_variants/skeletonVariant";

const SpeciesCardSkeleton = () => {
	return (
		<motion.div
			variants={skeletonVariant}
			initial={"initial"}
			animate={"animate"}
		>
			<div className={"flex items-center justify-center aspect-square mb-2 rounded-xl bg-container"}/>
			<div className={"w-full space-y-2"}>
				<div className={"h-5 w-2/3 rounded-xl bg-container"}/>
				<div className={"h-4 w-1/2 rounded-xl bg-container"}/>
			</div>
		</motion.div>
	)
}

export default SpeciesCardSkeleton