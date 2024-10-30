import axios, {AxiosError} from "axios";
import logger from "@/logging";

const perenualApiUrl = "https://perenual.com/api"

const perenualApiKey = process.env.NEXT_PERENUAL_API_KEY || ''

const getAxiosErrorMessage = (error: AxiosError): string => {
	logger.error(error)

	let message: string = 'An error occurred. Please try again in a few minutes'

	switch (error.status) {
		case 429:
			message = 'Exceeded the maximum daily requests. Please try again tomorrow.'
			break
		case 404:
		case 500:
			message = 'We’re experiencing technical difficulties. Please try again in a few minutes.'
			break
	}

	return message
}

const getErrorMessage = (error: unknown) => {
	if (axios.isAxiosError(error))
		return {
			error: getAxiosErrorMessage(error as AxiosError)
		}
	else
		return {
			error: 'An unexpected error occurred'
		}
}

export {
	perenualApiUrl,
	perenualApiKey,
	getErrorMessage
}