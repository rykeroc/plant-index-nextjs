import getSpeciesList from "@/data/actions/getSpeciesList";
import {QueryClient} from "@tanstack/react-query";
import {commonInfiniteQueryOptions, initialParams} from "@/data/queries/common";

const prefetchInfiniteSpeciesListQuery = async (queryClient: QueryClient) => {
	return await queryClient.prefetchInfiniteQuery({
		...commonInfiniteQueryOptions,
		queryKey: [
			"species-list", initialParams
		],
		queryFn: async () => {
			const {success, error} = await getSpeciesList(initialParams)
			if (error) throw error
			if (success) return success
		},
	})
}

export default prefetchInfiniteSpeciesListQuery
