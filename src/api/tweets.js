import { BB_URL, BB_URL as URL } from '../constants'

export const bookmarkTweets = async (folderId, tweets, token) => {
    const bookmarkURL = BB_URL + '/user/folders/' + folderId
    const reqData = JSON.stringify({
		tweets: tweets
	})
	try {
		const response = await fetch(bookmarkURL, {
			method: 'PUT',
			cache: 'no-cache',
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
			body: reqData,
		})
		const status = response.status
		const data = await response.json()
		console.log(data)
		if (status === 201) {
			return {
				error: null,
				message: data
			}
		} else {
			return {
				error: data,
			}
		}
	} catch (error) {
		console.error(error)
		return { error: error }
	}
}