import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getSpeciesList, {SpeciesListParams} from "@/data/actions/getSpeciesList";
import SpeciesCardList from "@/app/_components/SpeciesCardList";
import SpeciesSortOptions from "@/app/_constants/SpeciesSortOptions";
import SpeciesCycleOptions from "@/app/_constants/SpeciesCycleOptions";
import SpeciesWateringOptions from "@/app/_constants/SpeciesWateringOptions";
import SpeciesSunlightOptions from "@/app/_constants/SpeciesSunlightOptions";

export default async function Home() {
	const initialParams: SpeciesListParams = {
		order: SpeciesSortOptions.Select,
		cycle: SpeciesCycleOptions.Select,
		watering: SpeciesWateringOptions.Select,
		sunlight: SpeciesSunlightOptions.Select,
		page: 1
	}
	const queryClient = new QueryClient()
	await queryClient.prefetchInfiniteQuery({
		queryKey: [
			"species-list", initialParams
		],
		queryFn: async () => await getSpeciesList(initialParams),
		initialPageParam: initialParams.page,
		staleTime: 60 * 1000,
	})

	return (
		<div className={"flex flex-row gap-0 lg:gap-6"}>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<SpeciesCardList initialParams={initialParams}/>
			</HydrationBoundary>
		</div>
	);
}
