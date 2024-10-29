"use client"

import MaterialIcon from "@/app/_components/MaterialIcon";
import Link from "next/link";
import ImageContainer from "@/app/_components/ImageContainer";

type SpeciesCardProps = {
	speciesId: number,
	imgSrc: string,
	imgAlt: string,
	commonName: string,
	scientificName: string
}

const SpeciesCard = ({ speciesId, imgSrc, imgAlt, commonName, scientificName }: Readonly<SpeciesCardProps>) => {
	return (
		<div className={'flex flex-col gap-2'}>
			<Link href={`/${speciesId}`}>
				<div  className={'hover:shadow-lg'}>
					<ImageContainer className={'aspect-square'}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						{
							imgSrc != ''
								? (
									<img
										className={"w-full h-full rounded-xl"}
										src={imgSrc}
										alt={imgAlt}
										width={100}
										height={100}/>
								) : (
									<MaterialIcon name={'psychiatry'} className={'text-6xl'}/>
								)
						}
					</ImageContainer>
				</div>
			</Link>
			<div className={"w-full overflow-ellipsis"}>
				<p className={"line-clamp-1"}>{commonName}</p>
				<small className={"line-clamp-1"}>{scientificName}</small>
			</div>
		</div>
	)
}

export default SpeciesCard