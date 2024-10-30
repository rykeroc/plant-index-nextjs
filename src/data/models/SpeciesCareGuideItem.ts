interface SpeciesCareGuideSection {
	id: number;
	type: string;
	description: string
}

export interface SpeciesCareGuideItem {
	id: number;
	species_id: number;
	common_name: string;
	scientific_name: string[];
	section: SpeciesCareGuideSection[]
}