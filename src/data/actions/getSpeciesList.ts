'use server'

import {getErrorMessage, perenualApiKey, perenualApiUrl} from "@/data/actions/common";
import axios from "axios";
import {SpeciesListResponse} from "@/data/models/SpeciesListResponse";

export type SpeciesListParams = {
	page?: number;
	q?: string;
	cycle?: string;
	watering?: string;
	sunlight?: string;
	order?: string;
	key?: string;
}

const getSpeciesList = async (params: Readonly<SpeciesListParams> = {}): Promise<{
	success?: SpeciesListResponse,
	error?: string
}> => {
	let requestUrl = Object.keys(params)
		.reduce((acc, curr) => {
			const key = curr as keyof SpeciesListParams
			return params[key] ? `${acc}&${curr}=${params[key] ?? ''}` : acc
		}, `${perenualApiUrl}/species-list?`)

	if (!params.key)
		requestUrl += `&key=${perenualApiKey}`

	console.log(`Request URL: ${requestUrl}`)

	try {
		console.log("Sending species list request...")
		const response = await axios.get(
			requestUrl,
			{timeout: 10 * 1000}
		)
		console.log("Received response for species list")
		console.log(`Response data: ${JSON.stringify(response.data)}`)
		return {
			success: response.data as SpeciesListResponse
		}
	} catch (error) {
		return getErrorMessage(error)
	}
}

export default getSpeciesList