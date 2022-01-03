import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import { SET_LOGIN } from '../context/action.types'

import {
	Container,
	Spinner,
    Row,
    Col
} from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { getFolders } from '../api/folders'

import Folder from '../components/Folder'

import OneFolder from './OneFolder'
import Import from './Import'
import Likes from './Likes'

import { shareFolder } from '../api/folders'

const Folders = () => {
    const { state, dispatch } = useContext(AppContext)
	const history = useHistory()

	const { loggedIn, token } = state

    const [ isLoading, setIsLoading ] = useState(true)
    const [ gotFolders, setGotFolders ] = useState(false)
    const [ foldersArr, setFoldersArr ] = useState([])
    const [ currentFolder, setCurrentFolder] = useState(null)
    const [ prevFolder, setPrevFolder ] = useState(null)
    const [ selectedFolder, setSelectedFolder ] = useState({folderId: null})

    const refreshFolders = () => {
        setGotFolders(false)
    }

	const share = async (folderId, value) => {
		console.log(`setting ${folderId} to shared=${value}`)
		const result = await shareFolder(folderId, token, value)
		console.log(result)
		if (result.error) {
			toast('Failed to share folder', { type: 'error' })
			return
		} else {
			const folder = foldersArr.find(folder => folder.folderId === folderId)
			toast(`${folder.folderName} was ${value ? 'shared' : 'unshared'}!`, { type: 'success' })
			const newValue = result.response.shared ? true : false
			const newUrl = result.response.shared ? result.response.url : null
			console.log(`setting newValue: ${newValue}, url: ${newUrl}`)
			const newArray = foldersArr.map(folder => (
				folder.folderId === folderId
					? { ...folder, shared: newValue, url: newUrl}
					: folder
			))
			setFoldersArr(newArray)
			refreshFolders()
		}
	}

    const selectFolder = (folderId) => {
        if (prevFolder.folderId === folderId) {
            return
        }
        setCurrentFolder(foldersArr.find(folder => folder.folderId === folderId))
    }

    useEffect(() => {
        refreshFolders()
    }, [selectedFolder])

    useEffect(() => {
        if (!currentFolder) {
            refreshFolders()
            return
        }
        if (prevFolder) {
            if (
                    currentFolder.folderName === prevFolder.folderName &&
                    currentFolder.tweets.length === prevFolder.tweets.length &&
					currentFolder.shared === prevFolder.shared
                ) {
                    return
                } else {
                    setSelectedFolder(currentFolder)
                    setPrevFolder(currentFolder)
                }
        } else {
            setSelectedFolder(currentFolder)
            setPrevFolder(currentFolder)
        }
    }, [currentFolder])

    useEffect(() => {
        if (gotFolders) {
            return
        }
        console.log('getting folders')
        if (loggedIn) {
            (async () => {
                const folders = await getFolders(token)
                if (folders?.error) {
                    toast(`Error: ${folders.error}`)
					localStorage.removeItem('state')
                    setGotFolders(true)
                    setIsLoading(false)
					dispatch({ type: SET_LOGIN, payload: false})
					history.push('/')
                    return
                }
                if (folders?.folders) {
					console.log('got folders: ')
					console.log(folders.folders)
                    setFoldersArr(folders.folders)
                    setGotFolders(true)
					setIsLoading(false)
                }
            })()
        }
    }, [gotFolders])

    useEffect(() => {
        if (foldersArr.length === 0) {
            return
        }
        setCurrentFolder(
					prevFolder
						? foldersArr.find(
								(folder) => folder.folderId === prevFolder.folderId
						  )
						: foldersArr[0]
				)
    }, [foldersArr])

    if (!loggedIn) {
        return (
            <Redirect to='/auth' />
        )
    } else {
        if (isLoading) {
            return (
							<div hidden={!isLoading} className='center-spinner'>
								<Spinner color='primary' />
								<div className='text-primary'>Loading...</div>
							</div>
						)
        } else {
            return (
							<Container fluid className='main-view'>
								<Row className='main-row'>
									<Col className='folders-col col-3'>
										<Container
											scrollable={`true`}
											className='folder-list pt-4 container-fluid no-padding'>
											<>
												<div className='folder-listcard mb-4'>
													<Folder
														folder={{ folderName: 'New Folder' }}
														key='newFolder'
														newFolder={true}
														refresh={refreshFolders}
													/>
												</div>
												{foldersArr.map((folder) => (
													<div
														className={
															'mb-4 ' +
															(folder.folderId === selectedFolder.folderId
																? 'selected-folder'
																: 'folder-listcard')
														}
														id={folder.folderId}
														onClick={() => {
															selectFolder(folder.folderId)
														}}>
														<Folder
															folder={folder}
															key={folder.folderId}
															newFolder={false}
															refresh={refreshFolders}
															selectFolder={selectFolder}
															selected={
																folder.folderId === selectedFolder.folderId
															}
														/>
													</div>
												))}
											</>
										</Container>
									</Col>
									<Col className='pages-col'>
										<Switch>
											<Route exact path='/folders/view'>
												<OneFolder
													refresh={refreshFolders}
													folder={selectedFolder}
													share={share}
												/>
											</Route>
											<Route exact path='/folders/import'>
												<Import
													refresh={refreshFolders}
													folder={selectedFolder}
												/>
											</Route>
											<Route exact path='/folders/likes'>
												<Likes
													refresh={refreshFolders}
													folder={selectedFolder}
												/>
											</Route>
										</Switch>
									</Col>
								</Row>
							</Container>
						)
        }
    } 
}

export default Folders