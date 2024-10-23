import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getSpeciesList from "@/data/actions/getSpeciesList";
import SpeciesCardList from "@/app/_components/SpeciesCardList";

export default async function Home() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ["species-list"],
		queryFn: () => getSpeciesList(),

	})

	return (
		<div className={"flex flex-row gap-0 lg:gap-6"}>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<SpeciesCardList/>
			</HydrationBoundary>
		</div>
	);
}
