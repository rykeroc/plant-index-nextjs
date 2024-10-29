"use client"

import Button from "@/app/_components/base/Button";
import { motion } from "framer-motion";
import skeletonVariant from "@/app/_variants/skeletonVariant";

const SpeciesDetailsSkeleton = () => {
	return (
		<motion.div
			variants={skeletonVariant}
			initial={"initial"}
			animate={"animate"}
			className={'w-full flex flex-row ' +
				'gap-0 ' +
				'md:gap-10 ' +
				'xl:w-5/6 ' +
				'2xl:w-3/4 '}>

			<section className={'flex flex-col w-full gap-3 ' +
				'md:w-1/2 ' +
				'lg:w-2/3'}>

				{/* Mobile: Species image */}
				<section className={'w-full ' +
					'flex flex-col ' +
					'md:hidden'}>
					<SpeciesImageSkeleton/>
				</section>

				{/* All: Species names (Common and Scientific) */}
				<div className={'flex flex-col gap-2'}>
					<div className={"h-8 w-2/3 rounded-xl bg-container"}/>
					<div className={"h-6 w-1/3 rounded-xl bg-container"}/>
				</div>

				{/* All: Species Description */}
				<div className={'flex flex-col gap-2'}>
					<div className={"h-5 w-1/4 rounded-xl bg-container"}/>
					<div className={'flex flex-col gap-2'}>
						{
							[...Array(4)].map(i =>
								<div key={i} className={"h-4 w-full rounded-xl bg-container"}/>)
						}
					</div>
				</div>

				{/* All: Other listed details */}
				<div className={'flex flex-col justify-between gap-3 ' +
					'sm:flex-row'}>
					{
						[...Array(3)].map(i =>
							<div key={i} className={'flex flex-col gap-2 w-full '}>
								<div className={"h-5 w-1/6 rounded-xl bg-container"}/>
								<ul className={'gap-2 w-fill grid grid-cols-2 ' +
									'sm:flex sm:flex-col'}>
									{
										[...Array(6)].map(i => <li key={i} className={"h-4 w-1/2 rounded-xl bg-container"}/> )
									}
								</ul>
							</div>
						)
					}
				</div>

				<div className={'block md:hidden'}>
					<SpeciesExtraDetailsSkeleton/>
				</div>
			</section>

			{/* Tablet and desktop: Species and Image*/}
			<section className={'gap-3 ' +
				'hidden ' +
				'md:w-1/2 md:flex md:flex-col ' +
				'lg:w-1/3'}>
				<SpeciesImageSkeleton/>

				<SpeciesExtraDetailsSkeleton/>
			</section>

		</motion.div>
	)
}

const SpeciesImageSkeleton = () => (
	<div className={'w-full aspect-video rounded-xl bg-container'}/>
)

const SpeciesExtraDetailsSkeleton = () => (
	<div className={'flex flex-col gap-3'}>
		<div id={'info-grid'} className={'grid grid-cols-2 gap-3'}>
			{
				[...Array(4)].map((i) => <Button key={i} className={'h-12'}/>)
			}
		</div>

		<Button className={'h-12'}/>
	</div>
)

export default SpeciesDetailsSkeleton