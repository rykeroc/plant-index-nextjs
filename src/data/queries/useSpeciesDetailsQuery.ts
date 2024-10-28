import {commonQueryOptions} from "@/data/queries/common";
import getSpeciesDetails from "@/data/actions/getSpeciesDetails";
import {useQuery} from "@tanstack/react-query";

interface SpeciesDetailsQueryParams {
	speciesId: number
}

const useSpeciesDetailsQuery = ({speciesId}: Readonly<SpeciesDetailsQueryParams>) => {
	return useQuery({
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

export default useSpeciesDetailsQuery