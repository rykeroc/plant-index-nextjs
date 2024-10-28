import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import SpeciesList from "@/app/SpeciesList";
import {initialParams} from "@/data/queries/common";
import prefetchInfiniteSpeciesListQuery from "@/data/queries/prefetchInfiniteSpeciesListQuery";

export default async function Home() {
	// Initial data fetching on the server
	const queryClient = new QueryClient()
	await prefetchInfiniteSpeciesListQuery(queryClient)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SpeciesList initialParams={initialParams}/>
		</HydrationBoundary>
	);
}
