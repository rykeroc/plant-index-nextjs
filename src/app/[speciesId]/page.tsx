import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import SpeciesDetails from "@/app/_components/Species/SpeciesDetails/SpeciesDetails";
import prefetchSpeciesDetailsQuery from "@/data/queries/prefetchSpeciesDetailsQuery";
import {notFound} from "next/navigation";

interface SpeciesDetailsProps {
	params: {
		speciesId: number
	}
}

const SpeciesDetailsPage = async ({params}: Readonly<SpeciesDetailsProps>) => {
	console.log(`Species ID: ${params.speciesId}`)

	if (isNaN(params.speciesId)) notFound()

	const queryClient = new QueryClient()
	await prefetchSpeciesDetailsQuery(params.speciesId, queryClient)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SpeciesDetails speciesId={params.speciesId} />
		</HydrationBoundary>
	)
}

export default SpeciesDetailsPage