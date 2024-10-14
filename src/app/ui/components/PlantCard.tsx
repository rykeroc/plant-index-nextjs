"use client"

type PlantCardProps = {
	imgSrc: string,
	imgAlt: string,
	commonName: string,
	scientificName: string
}

const PlantCard = ({ imgSrc, imgAlt, commonName, scientificName }: Readonly<PlantCardProps>) => {
	return (
		<div className={"hover:drop-shadow-lg"}>
			<div className={"aspect-square mb-2"}>
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

export default PlantCard