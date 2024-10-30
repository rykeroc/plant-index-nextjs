'use server'

import {getErrorMessage, perenualApiKey, perenualApiUrl} from "@/data/actions/common";
import axios from "axios";
import logger from "@/logging";
import {SpeciesDetailsResponse} from "@/data/models/SpeciesDetailsResponse";
import {monthCompare, stringCompare} from "@/utils/comparison";
import {SpeciesParams} from "@/data/types/SpeciesParams";
import {SpeciesCareGuideResponse} from "@/data/models/SpeciesCareGuideResponse";

const getSpeciesDetails = async ({speciesId, key = undefined}: Readonly<SpeciesParams>): Promise<{
	success?: SpeciesDetailsResponse,
	error?: string
}> => {
	const requestUrl = `${perenualApiUrl}/species/details/${speciesId}?key=${key ?? perenualApiKey}`
	logger.verbose(`Request URL: ${requestUrl}`)

	try {
		// Get species details
		logger.info("Sending species details request...")
		let response = await axios.get(
			requestUrl,
			{timeout: 10 * 1000}
		)
		logger.info("Received response for species details")
		logger.debug(`Response data: ${JSON.stringify(response.data)}`)

		const detailsResponse = response.data as SpeciesDetailsResponse

		// Get species care guide
		logger.info("Sending species care guide request...")
		response = await axios.get(
			detailsResponse['care-guides'],
			{timeout: 10 * 1000}
		)
		logger.info("Received response for species care guide")
		logger.debug(`Response data: ${JSON.stringify(response.data)}`)

		const careGuideResponse = response.data as SpeciesCareGuideResponse

		// Add species care guide to response data
		detailsResponse.care_guides_sections = careGuideResponse.data[0].section

		/*
		 Remove possible duplicates from:
		 - Origin
		 - Propagation
		 - Pruning months
		 */
		detailsResponse.origin = Array.from(new Set(detailsResponse.origin)).sort(stringCompare)
		detailsResponse.propagation = Array.from(new Set(detailsResponse.propagation)).sort(stringCompare)
		detailsResponse.pruning_month = Array.from(new Set(detailsResponse.pruning_month)).sort(monthCompare)

		return {
			success: detailsResponse
		}
	} catch (error) {
		return getErrorMessage(error)
	}
}

export default getSpeciesDetails