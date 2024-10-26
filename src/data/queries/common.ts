import {SpeciesListParams} from "@/data/actions/getSpeciesList";
import SpeciesSortOptions from "@/app/_constants/SpeciesSortOptions";
import SpeciesCycleOptions from "@/app/_constants/SpeciesCycleOptions";
import SpeciesWateringOptions from "@/app/_constants/SpeciesWateringOptions";
import SpeciesSunlightOptions from "@/app/_constants/SpeciesSunlightOptions";

const initialParams: SpeciesListParams = {
	order: SpeciesSortOptions.Select,
	cycle: SpeciesCycleOptions.Select,
	watering: SpeciesWateringOptions.Select,
	sunlight: SpeciesSunlightOptions.Select,
	q: '',
	page: 1
}

const commonInfiniteQueryOptions: { staleTime: number; initialPageParam: number } = {
	initialPageParam: initialParams.page ?? 1,
	staleTime: 60 * 1000
}

export {
	initialParams,
	commonInfiniteQueryOptions
}