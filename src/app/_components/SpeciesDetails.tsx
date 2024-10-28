'use client'

import MaterialIcon from "@/app/_components/MaterialIcon";
import ImageContainer from "@/app/_components/ImageContainer";
import Button from "@/app/_components/base/Button";
import useSpeciesDetailsQuery from "@/data/queries/useSpeciesDetailsQuery";
import {useRouter} from "next/navigation";

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
							{
								[data?.origin, data?.propagation, data?.pruning_month].map(e =>
									<div key={e?.toString()}>
										<h4 className={'text-textSecondary'}>Origin</h4>
										<ul>
											{
												e?.map(i => <li key={i}>{i}</li>)
											}
										</ul>
									</div>
								)
							}
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
		<ImageContainer className={'w-full '}>
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
	return (
		<div className={'flex flex-col gap-3'}>
			<div id={'info-grid'} className={'grid grid-cols-2 gap-3'}>
				<Button>
					<MaterialIcon name={'water_drop'}/>
					<p className={'text-textSecondary'}>
						Watering
					</p>
				</Button>
				<Button>
					<MaterialIcon name={'sunny'}/>
					<p className={'text-textSecondary'}>
						Sunlight
					</p>
				</Button>
				<Button>
					<MaterialIcon name={'content_cut'}/>
					<p className={'text-textSecondary'}>
						Pruning
					</p>
				</Button>
				<Button>
					<MaterialIcon name={'cycle'}/>
					<p className={'text-textSecondary'}>
						Cycle
					</p>
				</Button>
			</div>

			<Button className={'w-full justify-between'}>
				<div className={'flex flex-row gap-2'}>
					<MaterialIcon name={'book'}/>
					<p className={'text-textSecondary'}>
						Care guide
					</p>
				</div>
				<MaterialIcon name={'keyboard_arrow_right'}/>
			</Button>
		</div>
	)
}

export default SpeciesDetails