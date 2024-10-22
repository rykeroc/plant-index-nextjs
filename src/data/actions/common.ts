const perenualApiUrl = "https://perenual.com/api"

const getPerenualApiKey = () => {
	return process.env.NEXT_PERENUAL_API_KEY || ''
}

export {
	perenualApiUrl,
	getPerenualApiKey
}