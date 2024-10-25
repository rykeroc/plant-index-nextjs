"use client"

import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import getSpeciesList, {SpeciesListParams} from "@/data/actions/getSpeciesList";
import SpeciesCard from "@/app/_components/SpeciesCard";
import Dropdown from "@/app/_components/Inputs/Dropdown";
import SpeciesOrderOptions from "@/app/_constants/SpeciesSortOptions";
import SpeciesCycleOptions from "@/app/_constants/SpeciesCycleOptions";
import SpeciesWateringOptions from "@/app/_constants/SpeciesWateringOptions";
import SpeciesSunlightOptions from "@/app/_constants/SpeciesSunlightOptions";
import {useEffect, useRef, useState} from "react";
import TextInput from "@/app/_components/Inputs/TextInput";
import Button from "@/app/_components/Inputs/Button";
import RefineDialog from "@/app/_components/RefineDialog";
import SpeciesCardSkeleton from "@/app/_components/SpeciesCardSkeleton";
import MaterialIcon from "@/app/_components/MaterialIcon";
import {useInView} from "framer-motion";

const SpeciesCardList = ({initialParams}: Readonly<{ initialParams: SpeciesListParams }>) => {
	const ref = useRef(null)
	const isInView = useInView(ref)
	const [order, setOrder] = useState(initialParams.order ?? SpeciesOrderOptions.Select)
	const [cycle, setCycle] = useState(initialParams.cycle ?? SpeciesCycleOptions.Select)
	const [watering, setWatering] = useState(initialParams.watering ?? SpeciesWateringOptions.Select)
	const [sunlight, setSunlight] = useState(initialParams.sunlight ?? SpeciesSunlightOptions.Select)

	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleOnClick = () => {
		console.log("Filter button clicked")
		setIsDialogOpen((prev: boolean) => !prev)
	}

	const queryKey = [
		"species-list", { order, cycle, watering, sunlight }
	]

	const { isPending, isLoading, isFetched, isFetchingNextPage, isError, data, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: queryKey,
		queryFn: async ({pageParam}) =>
			await getSpeciesList({ order, cycle, watering, sunlight, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const currentPageNum = lastPage.data?.current_page ?? 1
			const lastPageNum = lastPage.data?.last_page
			return currentPageNum !== lastPageNum ? currentPageNum + 1 : null
		},
		staleTime: 60000 * 1000
	})
	const queryClient = useQueryClient()
	useEffect(() => {
		console.log("Fetching next page")
		if (isInView && hasNextPage) {
			fetchNextPage().then(() => console.log("Next page fetched"));
		}
	}, [isInView, hasNextPage, fetchNextPage]);
	const handleRefresh = async () => {
		await queryClient.invalidateQueries({queryKey: queryKey})
	}

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
						isFetched &&
						data?.pages.map((p) => (
							p.data?.data.map(e => (
								<SpeciesCard
									key={e.id}
									imgSrc={e.default_image?.medium_url ?? ''}
									imgAlt={`${e.common_name} thumbnail`}
									commonName={e.common_name}
									scientificName={e.scientific_name[0]}
								/>
							)))
						)
					}

					{
						(isPending || isLoading || isFetchingNextPage || data?.pages === undefined) &&
						[...Array(6)].map((_, index) => <SpeciesCardSkeleton key={index}/>)
					}

					<div ref={ref}/>
				</div>

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

			<RefineDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}
						  initSunlight={sunlight} initCycle={cycle} initOrder={order} initWatering={watering}
						  setSunlight={setSunlight} setCycle={setCycle} setOrder={setOrder} setWatering={setWatering}/>
		</>
	)
}

export default SpeciesCardList