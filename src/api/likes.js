import { BB_URL as URL } from '../constants'

const getLikes = async (token) => {
	const getFoldersURL = URL + '/user/likes'
	try {
		const response = await fetch(getFoldersURL, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				Authorization: `JWT ${token}`,
			},
		})
		const status = response.status
		const data = await response.json()
		if (status === 200) {
			return {
				error: null,
				tweets: data,
			}
		} else {
			return {
				error: data.message,
			}
		}
	} catch (error) {
		console.error(error)
		return { error: error }
	}
}

export default getLikes