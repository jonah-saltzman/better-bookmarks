const URL = 'https://betterbookmarks.herokuapp.com'

// 403 is old token

export const getFolders = async (token) => {
	const getFoldersURL = URL + '/user/folders'
	try {
		const response = await fetch(getFoldersURL, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
                'Authorization': `JWT ${token}`
			},
		})
        const status = response.status
        const data = await response.json()
        if (status === 200) {
            return {
                error: null,
                folders: data.folders,
            }
        } else {
            return {
                error: data.message
            }
        }
	} catch (error) {
		console.error(error)
        return null
	}
}

export const getOneFolder = async (folderId, token) => {
    const getFoldersURL = URL + '/user/folders/' + folderId
    console.log('getonefolder URL:')
    console.log(getFoldersURL)
	try {
		const response = await fetch(getFoldersURL, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
                'Authorization': `JWT ${token}`
			},
		})
        const status = response.status
        console.log(`getting one folder status: ${status}`)
        const data = await response.json()
        if (status === 200) {
            return {
                error: null,
                tweets: data.tweets,
            }
        } else {
            return {
                error: data.message
            }
        }
	} catch (error) {
		console.error(error)
        return {error: error}
	}
}