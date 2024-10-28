'use server'

import {getAxiosErrorMessage, perenualApiKey, perenualApiUrl} from "@/data/actions/common";
import axios, {AxiosError} from "axios";
import logger from "@/logging";
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

	logger.verbose(`Request URL: ${requestUrl}`)

	try {
		logger.info("Sending species list request...")
		const response = await axios.get(
			requestUrl,
			{timeout: 10 * 1000}
		)
		logger.info("Received response for species list")
		logger.debug(`Response data: ${JSON.stringify(response.data)}`)
		return {
			success: response.data as SpeciesListResponse
		}
	} catch (error) {
		if (axios.isAxiosError(error))
			return {
				error: getAxiosErrorMessage(error as AxiosError)
			}
		else
			return {
				error: 'An unexpected error occurred'
			}
	}
}

export default getSpeciesList