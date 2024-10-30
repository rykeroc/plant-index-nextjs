'use server'

import {getErrorMessage, perenualApiKey, perenualApiUrl} from "@/data/actions/common";
import axios from "axios";
import logger from "@/logging";
import {SpeciesDetailsResponse} from "@/data/models/SpeciesDetailsResponse";
import {monthCompare, stringCompare} from "@/utils/comparison";
import {SpeciesParams} from "@/data/types/SpeciesParams";

const getSpeciesDetails = async ({speciesId, key = undefined}: Readonly<SpeciesParams>): Promise<{
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
		return getErrorMessage(error)
	}
}

export default getSpeciesDetails