import logger from "@/app/_logging";
import axios from "axios";
import {SpeciesList} from "@/app/_data/models";

type SpeciesListParams = {
	search?: string;
	cycle?: string;
	watering?: string;
	sunlight?: string;
	page?: number;
}

class PerenualApiProxy {
	private static getApiUrl = () => {
		const host = process.env.NEXT_PUBLIC_PROXY_HOST
		const port = process.env.NEXT_PUBLIC_PROXY_PORT
		const httpStr = process.env.NODE_ENV === "production" ? "https" : "http"
		return `${httpStr}://${host}:${port}`
	}

	static getSpeciesList = async (
		options?: Readonly<SpeciesListParams>
	) => {
		logger.debug(`Params:
		Search: ${options?.search}
		Cycle: ${options?.watering}
		Watering: ${options?.watering}
		Sunlight: ${options?.sunlight}
		Page: ${options?.page}`)

		const endpointUrl = `${PerenualApiProxy.getApiUrl()}/api/species-list?q=${options?.search ?? ""}&cycle=${options?.cycle ?? ""}&watering=${options?.watering ?? ""}&sunlight=${options?.sunlight ?? ""}&page=${options?.page ?? 1}`
		logger.debug(`Request URL: ${endpointUrl}`)

		try {
			logger.info("Sending request species list request...")
			const response = await axios.get(
				endpointUrl, {}
			)
			logger.info("Received response for species list")
			logger.debug(`Response data: ${JSON.stringify(response.data)}`)
			return response.data as SpeciesList
		} catch (e: any) {
			logger.error(e)
			throw e
		}
	}
}

export default PerenualApiProxy

