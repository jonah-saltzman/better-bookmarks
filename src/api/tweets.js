import { BB_URL } from '../constants'

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

export const deleteTweet = async (folderId, tweet, token) => {
	const deleteURL = BB_URL + '/user/folders/' + folderId
	const reqData = JSON.stringify({
		tweets: [tweet]
	})
	try {
		const response = await fetch(deleteURL, {
			method: 'PATCH',
			cache: 'no-cache',
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
			body: reqData,
		})
		const status = response.status
		const data = await response.json()
		if (status === 200) {
			return {
				error: null,
				message: 'Deleted tweet from ',
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