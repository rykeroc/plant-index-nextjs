"use client"

import {useQueryClient} from "@tanstack/react-query";
import {SpeciesListParams} from "@/data/actions/getSpeciesList";
import SpeciesCard from "@/app/_components/SpeciesCard";
import SpeciesOrderOptions from "@/app/_constants/SpeciesSortOptions";
import SpeciesCycleOptions from "@/app/_constants/SpeciesCycleOptions";
import SpeciesWateringOptions from "@/app/_constants/SpeciesWateringOptions";
import SpeciesSunlightOptions from "@/app/_constants/SpeciesSunlightOptions";
import {useEffect, useRef, useState} from "react";
import TextInput from "@/app/_components/base/TextInput";
import Button from "@/app/_components/base/Button";
import RefineDialog from "@/app/_components/RefineDialog";
import SpeciesCardSkeleton from "@/app/_components/SpeciesCardSkeleton";
import MaterialIcon from "@/app/_components/MaterialIcon";
import {useInView} from "framer-motion";
import FilterDropdowns from "@/app/_components/FilterDropdowns";
import useInfiniteSpeciesListQuery from "@/data/queries/useInfiniteSpeciesListQuery";
import {SpeciesListItem} from "@/data/models/SpeciesListResponse";

const SpeciesList = ({initialParams}: Readonly<{ initialParams: SpeciesListParams }>) => {
	const endListRef = useRef(null)
	const isInView = useInView(endListRef)

	const [order, setOrder] = useState(initialParams.order ?? SpeciesOrderOptions.Select)
	const [cycle, setCycle] = useState(initialParams.cycle ?? SpeciesCycleOptions.Select)
	const [watering, setWatering] = useState(initialParams.watering ?? SpeciesWateringOptions.Select)
	const [sunlight, setSunlight] = useState(initialParams.sunlight ?? SpeciesSunlightOptions.Select)
	const [q, setQ] = useState('')

	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleOnClick = () => setIsDialogOpen((prev: boolean) => !prev)
	const handleRefresh = async () => await useQueryClient().invalidateQueries({queryKey: queryKey})

	// Infinite query for plant data
	const queryKey = ['species-list', {order, cycle, watering, sunlight, q}]
	const {
		isPending,
		isLoading,
		isFetched,
		isFetchingNextPage,
		isError,
		data,
		error,
		fetchNextPage,
		hasNextPage
	} = useInfiniteSpeciesListQuery({queryKey, order, cycle, watering, sunlight, q})
	const flattenedData: SpeciesListItem[] | undefined = data?.pages.flatMap(e => e ? [...e.data] : [])

	// Fetch next page when at bottom of page
	useEffect(() => {
		console.log("Fetching next page")
		if (isInView && hasNextPage) {
			fetchNextPage().then(() => console.log("Next page fetched"));
		}
	}, [isInView, hasNextPage, fetchNextPage]);

	return (
		<>
			<section className={"hidden lg:block w-fit space-y-3"}>
				<FilterDropdowns
					order={order} setOrder={setOrder}
					cycle={cycle} setCycle={setCycle}
					watering={watering} setWatering={setWatering}
					sunlight={sunlight} setSunlight={setSunlight}/>
			</section>


			<section className={'w-full'}>
				<div className={"flex flex-row w-full space-x-3 mb-5"}>
					{/* Search bar */}
					<TextInput placeholder={"Search"} iconName={"search"} iconPlacement={"leading"} setValue={setQ}/>
					{/* Filter button */}
					<Button className={"block lg:hidden"} onClick={handleOnClick}>
						<MaterialIcon name={"tune"}/>
					</Button>
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
						isFetched && !isError && flattenedData &&
						flattenedData.map(e => (
							<SpeciesCard
								key={e.id}
								imgSrc={e.default_image?.medium_url ?? ''}
								imgAlt={`${e.common_name} thumbnail`}
								commonName={e.common_name}
								scientificName={e.scientific_name[0]}
							/>
						))
					}

					{/* Item skeletons when loading initial or more data */}
					{
						(isPending || isLoading || isFetchingNextPage || flattenedData === undefined) && !isError  &&
						[...Array(12)].map((_, index) => <SpeciesCardSkeleton key={index}/>)
					}

					{/*
						Marker for end of list.
						Used to for loading more data.
					*/}
					<div ref={endListRef}/>
				</div>

				{/* Text when there are no entries for the current search. */}
				{
					q !== '' && isFetched && !isError && flattenedData &&
					flattenedData.length === 0 &&
                    <div className={'w-full flex flex-col items-center space-y-2'}>
						<MaterialIcon name={'search'} className={'text-6xl'}/>
                        <h3 className={"w-1/2 text-center"}>No search results for '{q}'</h3>
                    </div>
				}

				{/* Error message with button for refreshing data. */}
				{
					isError &&
                    <div className={'w-full flex flex-col items-center space-y-2'}>
                        <h3 className={"w-1/2 text-center"}>{error.message}</h3>
                        <Button onClick={handleRefresh}>
                            <MaterialIcon name={"refresh"} className={"transform"}/>
                            <p>Reload</p>
                        </Button>
                    </div>
				}
			</section>

			{/* Dialog for refining search on mobile devices. */}
			<RefineDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}
						  initSunlight={sunlight} initCycle={cycle} initOrder={order} initWatering={watering}
						  setSunlight={setSunlight} setCycle={setCycle} setOrder={setOrder} setWatering={setWatering}/>
		</>
	)
}

export default SpeciesList