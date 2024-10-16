"use client"

import TextInput from "@/app/ui/components/Inputs/TextInput";
import Button from "@/app/ui/components/Inputs/Button";
import PlantCard from "@/app/ui/components/PlantCard";
import Dropdown from "@/app/ui/components/Inputs/Dropdown";
import {useState} from "react";

export default function Home() {
	const handleOnClick = () => {
		// TODO
		console.log("Filter button clicked")
	}

	const sortOptions = {
		Select: "",
		Ascending : "asc",
		Descending: "desc"
	}
	const [sort, setSort] = useState(sortOptions.Ascending)

	const cycleOptions = {
		Select: "",
		Perennial: "perennial",
		Annual: "annual",
		Biennial: "biennial",
		Biannual: "biannual"
	}
	const [cycle, setCycle] = useState(cycleOptions.Select)

	const wateringOptions = {
		Select: "",
		None: "None",
		Minimum: "Minimum",
		Average: "Average",
		Frequent: "Frequent",
	}
	const [watering, setWatering] = useState(wateringOptions.Select)

	const sunlightOptions = {
		Select: "",
		Full_Shade: "full_shade",
		Part_Shade: "part_shade",
		Full_Sun: "full_sun",
	}
	const [sunlight, setSunlight] = useState(sunlightOptions.Select)

	return (
		<div className={"flex flex-row gap-0 lg:gap-6"}>
			<section className={"hidden lg:block w-1/6 space-y-3"}>
				<Dropdown label={"Sort"} options={sortOptions} onSelect={setSort}/>

				<Dropdown label={"Cycle"} options={cycleOptions} onSelect={setCycle}/>

				<Dropdown label={"Watering"} options={wateringOptions} onSelect={setWatering}/>

				<Dropdown label={"Sunlight"} options={sunlightOptions} onSelect={setSunlight}/>
			</section>

			<section>
				<div className={"flex flex-row space-x-3 mb-3"}>
					{/* Search bar */}
					<TextInput placeholder={"Search"} iconName={"search"} iconPlacement={"leading"}/>
					{/* Filter button */}
					<Button className={"block lg:hidden"} iconName={"tune"} onClick={handleOnClick}/>
				</div>

				{/* Plant list */}
				<div className={"grid gap-3 grid-cols-2 " +
					"lg:grid-cols-3 " +
					"xl:grid-cols-4 " +
					"2xl:grid-cols-5 "
				}>
					{/* Plant item */}
					<PlantCard
						imgSrc={"https://perenual.com/storage/species_image/1_abies_alba/medium/1536px-Abies_alba_SkalitC3A9.jpg"}
						imgAlt={""} commonName={"Common name"} scientificName={"Scientific name"}/>

					<PlantCard
						imgSrc={"https://perenual.com/storage/species_image/1_abies_alba/medium/1536px-Abies_alba_SkalitC3A9.jpg"}
						imgAlt={""} commonName={"Common name"} scientificName={"Scientific name"}/>
					<PlantCard
						imgSrc={"https://perenual.com/storage/species_image/1_abies_alba/medium/1536px-Abies_alba_SkalitC3A9.jpg"}
						imgAlt={""} commonName={"Common name"} scientificName={"Scientific name"}/>

					<PlantCard
						imgSrc={"https://perenual.com/storage/species_image/1_abies_alba/medium/1536px-Abies_alba_SkalitC3A9.jpg"}
						imgAlt={""} commonName={"Common name"} scientificName={"Scientific name"}/>
				</div>

			</section>
		</div>
	);
}
