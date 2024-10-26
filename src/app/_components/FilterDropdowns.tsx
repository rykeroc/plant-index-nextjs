import Dropdown from "@/app/_components/base/Dropdown";
import SpeciesOrderOptions from "@/app/_constants/SpeciesSortOptions";
import SpeciesCycleOptions from "@/app/_constants/SpeciesCycleOptions";
import SpeciesWateringOptions from "@/app/_constants/SpeciesWateringOptions";
import SpeciesSunlightOptions from "@/app/_constants/SpeciesSunlightOptions";

interface FilterDropdownProps {
	order: string
	setOrder: (val: string) => void
	cycle: string
	setCycle: (val: string) => void
	watering: string
	setWatering: (val: string) => void
	sunlight: string
	setSunlight: (val: string) => void
}

const FilterDropdowns = ({
	order, cycle, watering, sunlight,
	setOrder, setCycle, setWatering, setSunlight
}: Readonly<FilterDropdownProps>) => {
  return (
	  <>
		  <Dropdown label={"Order"} selected={order} options={SpeciesOrderOptions} onSelect={setOrder}/>
		  <Dropdown label={"Cycle"} selected={cycle} options={SpeciesCycleOptions} onSelect={setCycle}/>
		  <Dropdown label={"Watering"} selected={watering} options={SpeciesWateringOptions} onSelect={setWatering}/>
		  <Dropdown label={"Sunlight"} selected={sunlight} options={SpeciesSunlightOptions} onSelect={setSunlight}/>
	  </>
  )
}

export default FilterDropdowns