'use server'

import {getAxiosErrorMessage, perenualApiKey, perenualApiUrl} from "@/data/actions/common";
import axios, {AxiosError} from "axios";
import logger from "@/logging";
import {SpeciesList} from "@/data/models/SpeciesListData";

type SpeciesListParams = {
	page?: number;
	q?: string;
	cycle?: string;
	watering?: string;
	sunlight?: string;
	key?: string;
}

const getSpeciesList = async (params: Readonly<SpeciesListParams> = {}): Promise<{
	data?: SpeciesList,
	error?: Error
}> => {
	let requestUrl = Object.keys(params)
		.reduce((acc, curr) => {
			const key = curr as keyof SpeciesListParams
			return params[key] ? `${acc}&${curr}=${params[key] ?? ''}` : acc
		}, `${perenualApiUrl}/species-list?`)

	if (!params.key)
		requestUrl += `key=${perenualApiKey}`

	logger.debug(`Request URL: ${requestUrl}`)

	try {
		logger.info("Sending request species list request...")
		const response = await axios.get(
			requestUrl,
			{timeout: 10 * 1000}
		)
		logger.info("Received response for species list")
		logger.debug(`Response data: ${JSON.stringify(response.data)}`)
		return {data: response.data as SpeciesList}
	} catch (error) {
		if (axios.isAxiosError(error))
			return {
				error: new Error(getAxiosErrorMessage(error as AxiosError))
			}
		else
			return {
				error: new Error('An unexpected error occurred')
			}
	}
}

export default getSpeciesList