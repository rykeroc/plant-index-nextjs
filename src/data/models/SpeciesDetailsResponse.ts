import {SpeciesCareGuideItem} from "@/data/models/SpeciesCareGuideItem";

export interface SpeciesDetailsResponse {
	id: number;
	common_name: string;
	scientific_name: string[];
	other_name: string[];
	description: string;
	origin: string[];
	pruning_month: string[];
	propagation: string[];
	cycle: string;
	watering: string;
	sunlight: string[];
	'care-guides': string;
	care_guides_sections: SpeciesCareGuideItem[]
	default_image: {
		original_url: string;
		regular_url: string;
		medium_url: string;
		small_url: string;
		thumbnail: string;
	} | null;
}
