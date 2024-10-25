interface SpeciesListItem {
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

export interface SpeciesList {
	data: SpeciesListItem[];
	current_page: number;
	last_page: number;
}
