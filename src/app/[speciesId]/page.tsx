import logger from "@/logging";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import SpeciesDetails from "@/app/_components/SpeciesDetails";

interface SpeciesDetailsProps {
	params: {
		speciesId: number
	}
}

const SpeciesDetailsPage = async ({params}: Readonly<SpeciesDetailsProps>) => {
	logger.debug(`Species ID: ${params.speciesId}`)

	const queryClient = new QueryClient()
	// await prefetchSpeciesDetailsQuery(params.speciesId, queryClient)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SpeciesDetails speciesId={params.speciesId} />
		</HydrationBoundary>
	)
}

export default SpeciesDetailsPage