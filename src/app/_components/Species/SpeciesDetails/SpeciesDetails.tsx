'use client'

import MaterialIcon from "@/app/_components/MaterialIcon";
import ImageContainer from "@/app/_components/ImageContainer";
import Button from "@/app/_components/base/Button";
import useSpeciesDetailsQuery from "@/data/queries/useSpeciesDetailsQuery";
import {useRouter} from "next/navigation";
import {SpeciesDetailsResponse} from "@/data/models/SpeciesDetailsResponse";
import ErrorMessage from "@/app/_components/ErrorMessage";
import SpeciesDetailsSkeleton from "@/app/_components/Species/SpeciesDetails/SpeciesDetailsSkeleton";
import {useState} from "react";
import SpeciesCareGuideDialog from "@/app/_components/Species/SpeciesCareGuideDialog";
import {capitalize} from "@/utils/string";

interface SpeciesDetailsProps {
	speciesId: number;
}

const SpeciesDetails = ({speciesId}: Readonly<SpeciesDetailsProps>) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const handleOpenDialog = () => setIsDialogOpen(true)

	const {
		isPending,
		isLoading,
		isError,
		data,
		error
	} = useSpeciesDetailsQuery({speciesId})

	const router = useRouter()
	const handleRefresh = () => {
		console.log(`Refreshing data for Species ID: ${speciesId}`)
		router.refresh()
	}

	if ((isPending || isLoading) && !isError)
		return <SpeciesDetailsSkeleton/>

	if (isError)
		return <ErrorMessage
			errorMessage={error.message}
			onButtonClick={handleRefresh}
			buttonIconName={'refresh'}
			buttonLabel={'Reload'}/>

	const speciesImage = (
		<SpeciesImage src={data?.default_image?.original_url ?? ''} alt={`${data?.common_name} thumbnail`}/>
	)

	const speciesExtraDetails = (
		<SpeciesExtraDetails onCareGuideClick={handleOpenDialog} species={data}/>
	)

	return (
		<>
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
						<h2>{capitalize(data?.common_name)}</h2>
						<h3 className={'text-textSecondary'}>
							{capitalize(data?.scientific_name[0])}
						</h3>
					</div>

					{/* All: Species Description */}
					<div>
						<h4 className={'text-textSecondary'}>Description</h4>
						<p>{data?.description}</p>
					</div>

					{/* All: Other listed details */}
					<SpeciesInfoLists data={data}/>

					<div className={'block md:hidden'}>
						{speciesExtraDetails}
					</div>
				</section>

				{/* Tablet and desktop: Species and Image*/}
				<section className={'gap-3 ' +
					'hidden ' +
					'md:w-1/2 md:flex md:flex-col ' +
					'lg:w-1/3'}>
					{speciesImage}

					{speciesExtraDetails}
				</section>
			</div>

			{
				data?.care_guides_sections &&
                <SpeciesCareGuideDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} sections={data.care_guides_sections}/>
			}
		</>
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

const SpeciesExtraDetails = ({onCareGuideClick, species}: {
	onCareGuideClick: () => void,
	species?: SpeciesDetailsResponse
}) => {
	const gridButtons: { [label: string]: string } = {
		water_drop: species?.watering ?? 'None',
		sunny: species?.sunlight[0] ?? 'None',
		cycle: species?.cycle ?? 'None'
	}

	return (
		<div className={'flex flex-col gap-3'}>
				{
					Object.keys(gridButtons).map((k) =>
						<Button key={k}>
							<MaterialIcon name={k}/>
							<p>{capitalize(gridButtons[k])}</p>
						</Button>
					)
				}

			<Button className={'w-full justify-between'} onClick={onCareGuideClick}>
				<div className={'flex flex-row gap-2'}>
					<MaterialIcon name={'book'}/>
					<a className={'text-textSecondary'}>
						Care guide
					</a>
				</div>
				<MaterialIcon name={'keyboard_arrow_right'}/>
			</Button>
		</div>
	)
}

const SpeciesInfoLists = ({data}: Readonly<{ data: SpeciesDetailsResponse | undefined }>) => {
	const dict: { [name: string]: string[] } = {
		'Origin': data?.origin ?? [],
		'Propagation': data?.propagation ?? [],
		'Pruning month(s)': data?.pruning_month ?? []
	}

	return (
		<div className={'flex flex-col justify-between gap-3 ' +
			'sm:grid sm:grid-cols-3'}>
			{
				Object.keys(dict).map(k =>
					<div key={k?.toString()} className={'w-full'}>
						<h4 className={'text-textSecondary'}>{k}</h4>
						<ul className={'w-fill grid grid-cols-2 ' +
							'sm:flex sm:flex-col'}>
							{
								dict[k].map(i =>
									<li key={i} className={'w-fit overflow-ellipsis line-clamp-1'}>{i}</li>)
							}
						</ul>
					</div>
				)
			}
		</div>
	)
}

export default SpeciesDetails