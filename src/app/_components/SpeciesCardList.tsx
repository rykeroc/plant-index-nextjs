"use client"

import {useQuery} from "@tanstack/react-query";
import getSpeciesList, {SpeciesListParams} from "@/data/actions/getSpeciesList";
import SpeciesCard from "@/app/_components/SpeciesCard";
import Dropdown from "@/app/_components/Inputs/Dropdown";
import SpeciesOrderOptions from "@/app/_constants/SpeciesSortOptions";
import SpeciesCycleOptions from "@/app/_constants/SpeciesCycleOptions";
import SpeciesWateringOptions from "@/app/_constants/SpeciesWateringOptions";
import SpeciesSunlightOptions from "@/app/_constants/SpeciesSunlightOptions";
import {useState} from "react";
import TextInput from "@/app/_components/Inputs/TextInput";
import Button from "@/app/_components/Inputs/Button";
import RefineDialog from "@/app/_components/RefineDialog";

const SpeciesCardList = ({initialParams}: Readonly<{ initialParams: SpeciesListParams }>) => {
	const [order, setOrder] = useState(initialParams.order ?? SpeciesOrderOptions.Select)
	const [cycle, setCycle] = useState(initialParams.cycle ?? SpeciesCycleOptions.Select)
	const [watering, setWatering] = useState(initialParams.watering ?? SpeciesWateringOptions.Select)
	const [sunlight, setSunlight] = useState(initialParams.sunlight ?? SpeciesSunlightOptions.Select)
	const [page, setPage] = useState(initialParams.page ?? 1)

	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleOnClick = () => {
		console.log("Filter button clicked")
		setIsDialogOpen((prev: boolean) => !prev)
	}

	const { isPending, isLoading, isFetched, isError, data, error, } = useQuery({
		queryKey: [
			"species-list", { order, cycle, watering, sunlight, page }
		],
		queryFn: () => getSpeciesList({ order, cycle, watering, sunlight, page }),
		staleTime: 60000 * 1000,
	})

	return (
		<>
			<section className={"hidden lg:block w-fit space-y-3"}>
				<Dropdown label={"Order"} selected={order} options={SpeciesOrderOptions} onSelect={setOrder}/>
				<Dropdown label={"Cycle"} selected={cycle} options={SpeciesCycleOptions} onSelect={setCycle}/>
				<Dropdown label={"Watering"} selected={watering} options={SpeciesWateringOptions} onSelect={setWatering}/>
				<Dropdown label={"Sunlight"} selected={sunlight} options={SpeciesSunlightOptions} onSelect={setSunlight}/>
			</section>


			<section className={'w-full'}>
				<div className={"flex flex-row w-full space-x-3 mb-5"}>
					{/* Search bar */}
					<TextInput placeholder={"Search"} iconName={"search"} iconPlacement={"leading"}/>
					{/* Filter button */}
					<Button className={"block lg:hidden"} iconName={"tune"} onClick={handleOnClick}/>
				</div>

				{/* Species list items*/}
				<div className={"w-full grid gap-5 grid-cols-1 " +
					"sm:grid-cols-2 " +
					"md:grid-cols-3 " +
					"lg:grid-cols-4 " +
					"xl:grid-cols-5 " +
					"2xl:grid-cols-6 "
				}>
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


					{
						(isPending || isLoading) &&
                        <h2>Loading...</h2>
					}

					{
						isError &&
                        <h2>{error.message}</h2>
					}
				</div>
			</section>

			<RefineDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}
						  initSunlight={sunlight} initCycle={cycle} initOrder={order} initWatering={watering}
						  setSunlight={setSunlight} setCycle={setCycle} setOrder={setOrder} setWatering={setWatering}/>
		</>
	)
}

export default SpeciesCardList