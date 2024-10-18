type SpeciesListData = {
	id: number;
	common_name: string;
	scientific_name: string[];
	cycle: string;
	watering: string;
	sunlight: string[];
	default_image: {
		original_url: string;
		regular_url: string;
		medium_url: string;
		small_url: string;
		thumbnail: string;
	} | null;
}

export type SpeciesList = {
	data: SpeciesListData[],
	current_page: number
}
