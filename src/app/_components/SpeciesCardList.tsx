"use client"

import {useQuery} from "@tanstack/react-query";
import getSpeciesList from "@/data/actions/getSpeciesList";
import SpeciesCard from "@/app/_components/SpeciesCard";
import Dropdown from "@/app/_components/Inputs/Dropdown";
import SpeciesSortOptions from "@/app/_constants/SpeciesSortOptions";
import SpeciesCycleOptions from "@/app/_constants/SpeciesCycleOptions";
import SpeciesWateringOptions from "@/app/_constants/SpeciesWateringOptions";
import SpeciesSunlightOptions from "@/app/_constants/SpeciesSunlightOptions";
import {useState} from "react";
import TextInput from "@/app/_components/Inputs/TextInput";
import Button from "@/app/_components/Inputs/Button";

const SpeciesCardList = () => {
	const [sort, setSort] = useState(SpeciesSortOptions.Ascending)
	const [cycle, setCycle] = useState(SpeciesCycleOptions.Select)
	const [watering, setWatering] = useState(SpeciesWateringOptions.Select)
	const [sunlight, setSunlight] = useState(SpeciesSunlightOptions.Select)

	const handleOnClick = () => {
		// TODO
		console.log("Filter button clicked")
	}

	const { isPending, isLoading, isFetched, isError, data, error, } = useQuery({
		queryKey: ["species-list"],
		queryFn: () => getSpeciesList(),
	})

	return (
		<>
			<section className={"hidden lg:block w-1/6 space-y-3"}>
				<Dropdown label={"Sort"} options={SpeciesSortOptions} onSelect={setSort}/>
				<Dropdown label={"Cycle"} options={SpeciesCycleOptions} onSelect={setCycle}/>
				<Dropdown label={"Watering"} options={SpeciesWateringOptions} onSelect={setWatering}/>
				<Dropdown label={"Sunlight"} options={SpeciesSunlightOptions} onSelect={setSunlight}/>
			</section>


			<section>
				<div className={"flex flex-row space-x-3 mb-3"}>
					{/* Search bar */}
					<TextInput placeholder={"Search"} iconName={"search"} iconPlacement={"leading"}/>
					{/* Filter button */}
					<Button className={"block lg:hidden"} iconName={"tune"} onClick={handleOnClick}/>
				</div>

				{/* Species list items*/}
				<div className={"grid gap-3 grid-cols-2 " +
					"lg:grid-cols-3 " +
					"xl:grid-cols-4 " +
					"2xl:grid-cols-5 "
				}>

					{
						isError &&
                        <h2>{error.message}</h2>
					}

					{
						isLoading &&
                        <h2>Loading...</h2>
					}

					{
						isFetched &&
						data?.data?.map((e) =>
							<SpeciesCard
								key={e.id}
								imgSrc={e.default_image?.medium_url ?? ''}
								imgAlt={`${e.common_name} thumbnail`}
								commonName={e.common_name}
								scientificName={e.scientific_name[0]}
							/>)
					}
				</div>

			</section>
		</>
	)
}

export default SpeciesCardList