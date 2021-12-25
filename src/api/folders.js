import { BB_URL as URL } from "../constants"

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

export const newFolder = async (folderName, token) => {
    const newFolderURL = URL + '/user/folders'
    const reqData = JSON.stringify({
                    folderName: `${folderName}`
                })
    try {
			const response = await fetch(newFolderURL, {
				method: 'POST',
				cache: 'no-cache',
				headers: {
					Authorization: `JWT ${token}`,
					'Content-Type': 'application/json'
				},
				body: reqData,
			})
			const status = response.status
			const data = await response.json()
			if (status === 201) {
				return {
					error: null,
					message: `Created folder ${data.folder}!`,
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