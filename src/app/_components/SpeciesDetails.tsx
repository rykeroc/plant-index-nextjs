'use client'

import MaterialIcon from "@/app/_components/MaterialIcon";
import ImageContainer from "@/app/_components/ImageContainer";
import Button from "@/app/_components/base/Button";
import useSpeciesDetailsQuery from "@/data/queries/useSpeciesDetailsQuery";
import {useRouter} from "next/navigation";
import {SpeciesDetailsResponse} from "@/data/models/SpeciesDetailsResponse";

interface SpeciesDetailsProps {
	speciesId: number;
}

const SpeciesDetails = ({speciesId}: Readonly<SpeciesDetailsProps>) => {
	const {
		isPending,
		isLoading,
		isFetched,
		isError,
		data,
		error
	} = useSpeciesDetailsQuery({speciesId})

	const speciesImage = (
		<SpeciesImage src={data?.default_image?.original_url ?? ''} alt={`${data?.common_name} thumbnail`}/>
	)

	const router = useRouter()
	const handleRefresh = () => {
		console.log(`Refreshing data for Species ID: ${speciesId}`)
		router.refresh()
	}

	return (
		<div className={"w-full flex flex-row justify-center"}>
			{
				(isPending || isLoading) && !isError &&
                <h1>Loading...</h1>
			}

			{
				isError &&
                <div className={'flex flex-col items-center space-y-2'}>
                    <h3 className={"w-1/2 text-center"}>{error.message}</h3>
                    <Button onClick={handleRefresh}>
                        <MaterialIcon name={"refresh"} className={"transform"}/>
                        <p>Reload</p>
                    </Button>
                </div>
			}

			{
				isFetched && data &&
                <div className={'w-full flex flex-row ' +
					'gap-0 ' +
					'md:gap-10 ' +
					'xl:w-5/6 ' +
					'2xl:w-3/4 '}>

                    <section className={'flex flex-col w-full gap-3 ' +
						'md:w-1/2 ' +
						'lg:w-2/3'}>

						{/* Mobile: Species image */}
                        <section className={'w-full ' +
							'flex flex-col ' +
							'md:hidden'}>
							{speciesImage}
                        </section>

						{/* All: Species names (Common and Scientific) */}
                        <div>
                            <h2>{data?.common_name}</h2>
                            <h3 className={'text-textSecondary'}>{data?.scientific_name}</h3>
                        </div>

						{/* All: Species Description */}
                        <div>
                            <h4 className={'text-textSecondary'}>Description</h4>
                            <p>{data?.description}</p>
                        </div>

						{/* All: Other listed details */}
                        <div className={'flex flex-row justify-between'}>
                            <SpeciesInfoLists data={data}/>
                        </div>

                        <div className={'block md:hidden'}>
                            <SpeciesExtraDetails/>
                        </div>
                    </section>

					{/* Tablet and desktop: Species and Image*/}
                    <section className={'gap-3 ' +
						'hidden ' +
						'md:w-1/2 md:flex md:flex-col ' +
						'lg:w-1/3'}>
						{speciesImage}

                        <SpeciesExtraDetails/>
                    </section>
                </div>
			}
		</div>
	)
}

const SpeciesImage = ({src, alt}: Readonly<{ src: string, alt: string }>) => {
	return (
		<ImageContainer className={'w-full cursor-auto'}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			{
				src != ''
					? (
						<img
							className={"inset-0 w-full h-full rounded-xl object-cover aspect-square"}
							src={src}
							alt={alt}/>
					) : (
						<MaterialIcon name={'psychiatry'} className={'text-6xl'}/>
					)
			}
		</ImageContainer>
	)
}

const SpeciesExtraDetails = () => {
	const gridButtons: { [label: string]: string } = {
		Watering: 'water_drop',
		Sunlight: 'sunny',
		Pruning: 'content_cut',
		Cycle: 'cycle'
	}

	return (
		<div className={'flex flex-col gap-3'}>
			<div id={'info-grid'} className={'grid grid-cols-2 gap-3'}>
				{
					Object.keys(gridButtons).map((k) =>
						<Button>
							<MaterialIcon name={gridButtons[k]}/>
							<p>{k}</p>
						</Button>
					)
				}
			</div>

			<Button className={'w-full justify-between'}>
				<div className={'flex flex-row gap-2'}>
					<MaterialIcon name={'book'}/>
					{/* TODO: Show dialog */}
					<a className={'text-textSecondary'}>
						Care guide
					</a>
				</div>
				<MaterialIcon name={'keyboard_arrow_right'}/>
			</Button>
		</div>
	)
}

const SpeciesInfoLists = ({data}: Readonly<{ data: SpeciesDetailsResponse }>) => {
	const dict: { [name: string]: string[] } = {
		'Origin': data?.origin,
		'Propagation': data?.propagation,
		'Pruning month(s)': data?.pruning_month
	}

	return Object.keys(dict).map(k =>
		<div key={k?.toString()}>
			<h4 className={'text-textSecondary'}>{k}</h4>
			<ul>
				{
					dict[k].map(i => <li key={i}>{i}</li>)
				}
			</ul>
		</div>
	)
}

export default SpeciesDetails