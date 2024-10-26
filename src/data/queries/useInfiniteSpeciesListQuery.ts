import {useInfiniteQuery} from "@tanstack/react-query";
import getSpeciesList, {SpeciesListParams} from "@/data/actions/getSpeciesList";
import {commonInfiniteQueryOptions} from "@/data/queries/common";

interface InfiniteSpeciesListQueryParams {
	queryKey: (string | SpeciesListParams)[]
	order: string
	cycle: string
	watering: string
	sunlight: string
	q: string
}

const useInfiniteSpeciesListQuery = ({
	queryKey, order, cycle, watering, sunlight, q
}: Readonly<InfiniteSpeciesListQueryParams>) => {
	return useInfiniteQuery({
		...commonInfiniteQueryOptions,
		queryKey: queryKey,
		queryFn: async ({pageParam}) => {
			const {success, error} = await getSpeciesList({order, cycle, watering, sunlight, q, page: pageParam})
			if (error) throw error
			if (success) return success
		},
		getNextPageParam: (lastPage) => {
			if (lastPage === undefined) return undefined
			return lastPage.current_page !== lastPage.last_page ? lastPage.current_page + 1 : undefined
		},
	})
}

export default useInfiniteSpeciesListQuery