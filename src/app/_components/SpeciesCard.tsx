"use client"

type SpeciesCardProps = {
	imgSrc: string,
	imgAlt: string,
	commonName: string,
	scientificName: string
}

const SpeciesCard = ({ imgSrc, imgAlt, commonName, scientificName }: Readonly<SpeciesCardProps>) => {
	return (
		<div>
			<div className={"aspect-square mb-2 cursor-pointer rounded-xl " +
				"hover:shadow-lg"}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					className={"w-full h-full rounded-xl"}
					src={imgSrc}
					alt={imgAlt}
					width={100}
					height={100}/>
			</div>
			<div className={"w-full overflow-ellipsis"}>
				<p className={"line-clamp-1"}>{commonName}</p>
				<small className={"line-clamp-1"}>{scientificName}</small>
			</div>
		</div>
	)
}

export default SpeciesCard