const URL = 'https://betterbookmarks.herokuapp.com'

export const getFolders = async (token) => {
	const getFoldersURL = URL + '/user/folders'
	try {
		const response = await fetch(getFoldersURL, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
			},
		})
        
	} catch (error) {
		console.error(error)
        return null
	}
}

export default getFolders
