'use server'

import {getAxiosErrorMessage, perenualApiKey, perenualApiUrl} from "@/data/actions/common";
import axios, {AxiosError} from "axios";
import logger from "@/logging";
import {SpeciesDetailsResponse} from "@/data/models/SpeciesDetailsResponse";
import {monthCompare, stringCompare} from "@/utils/comparison";

export type SpeciesDetailsParams = {
	speciesId: number;
	key?: string;
}

const getSpeciesList = async ({speciesId, key = undefined}: Readonly<SpeciesDetailsParams>): Promise<{
	success?: SpeciesDetailsResponse,
	error?: string
}> => {
	const requestUrl = `${perenualApiUrl}/species/details/${speciesId}?key=${key ?? perenualApiKey}`
	logger.verbose(`Request URL: ${requestUrl}`)

	try {
		logger.info("Sending species details request...")
		const response = await axios.get(
			requestUrl,
			{timeout: 10 * 1000}
		)
		logger.info("Received response for species details")
		logger.debug(`Response data: ${JSON.stringify(response.data)}`)

		const responseData = response.data as SpeciesDetailsResponse

		/*
		 Remove possible duplicates from:
		 - Origin
		 - Propagation
		 - Pruning months
		 */
		responseData.origin = Array.from(new Set(responseData.origin)).sort(stringCompare)
		responseData.propagation = Array.from(new Set(responseData.propagation)).sort(stringCompare)
		responseData.pruning_month = Array.from(new Set(responseData.pruning_month)).sort(monthCompare)

		return {
			success: response.data as SpeciesDetailsResponse
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