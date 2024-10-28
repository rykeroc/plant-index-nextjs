import {QueryClient} from "@tanstack/react-query";
import {commonQueryOptions} from "@/data/queries/common";
import getSpeciesDetails from "@/data/actions/getSpeciesDetails";

const prefetchSpeciesDetailsQuery = async (speciesId: number, queryClient: QueryClient) => {
	return await queryClient.prefetchQuery({
		...commonQueryOptions,
		queryKey: [
			'species-details', speciesId
		],
		queryFn: async () => {
			const {success, error} = await getSpeciesDetails({speciesId})
			if (error) throw new Error(error)
			if (success) return success
		},
	})
}

export default prefetchSpeciesDetailsQuery