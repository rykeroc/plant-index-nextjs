import {AxiosError} from "axios";
import logger from "@/logging";

const perenualApiUrl = "https://perenual.com/api"

const perenualApiKey = process.env.NEXT_PERENUAL_API_KEY || ''

const getAxiosErrorMessage = (error: AxiosError): string => {
	logger.error(error)

	let message: string = 'An error occurred. Please try again in a few minutes'

	switch (error.status) {
		case 404:
		case 500:
			message = 'We’re experiencing technical difficulties. Please try again in a few minutes.'
			break
	}

	return message
}

export {
	perenualApiUrl,
	perenualApiKey,
	getAxiosErrorMessage
}