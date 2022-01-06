import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import { SET_LOGIN } from '../context/action.types'

import { Container, Spinner, Row, Col } from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { getFolders } from '../api/folders'

import Folder from '../components/Folder'

import OneFolder from './OneFolder'
import Import from './Import'
import Likes from './Likes'

import { shareFolder } from '../api/folders'
import Large from '../components/Large'

const Folders = () => {
	const { state, dispatch } = useContext(AppContext)
	const history = useHistory()

	const { loggedIn, token } = state

	const [isLoading, setIsLoading] = useState(true)
	const [gotFolders, setGotFolders] = useState(false)
	const [foldersArr, setFoldersArr] = useState([])
	const [currentFolder, setCurrentFolder] = useState(null)
	const [prevFolder, setPrevFolder] = useState(null)
	const [selectedFolder, setSelectedFolder] = useState({ folderId: null })
    const [editedFolder, setEditedFolder] = useState(null)
    const [viewLarge, setViewLarge] = useState(false)
    const [loadedTweets, setLoadedTweets] = useState({ colA: [], colB: [] })
    const [didSaveComponents, setDidSaveComponents] = useState(false)

	const refreshFolders = () => {
		setGotFolders(false)
	}

    const onHistoryChange = () => {
        setViewLarge(false)
    }

    useEffect(() => {
        const unlisten = history.listen(() => onHistoryChange())
        return () => unlisten()
    }, [])

    const editFolder = (folderId, deleted) => {
        if (deleted) {
            const deleted = foldersArr.findIndex(folder => folder.folderId === folderId)
            setCurrentFolder(foldersArr[(deleted === 0 ? 0 : deleted - 1)])
            refreshFolders()
            return
        } else {
            setEditedFolder(folderId)
            setCurrentFolder(foldersArr.find(folder => folder.folderId === folderId))
            refreshFolders()
        }
    }

    const selectFolder = (folderId) => {
        if (selectFolder.folderId === folderId) {
            return
        }
        if (foldersArr.some(folder => folder.folderId === folderId)) {
            setCurrentFolder(foldersArr.find(folder => folder.folderId === folderId))
        }
    }

	const share = async (folderId, value) => {
		const result = await shareFolder(folderId, token, value)
		if (result.error) {
			toast('Failed to share folder', { type: 'error' })
			return
		} else {
			const folder = foldersArr.find((folder) => folder.folderId === folderId)
			toast(`${folder.folderName} was ${value ? 'shared' : 'unshared'}!`, {
				type: 'success',
			})
			const newValue = result.response.shared ? true : false
			const newUrl = result.response.shared ? result.response.url : null
			const newArray = foldersArr.map((folder) =>
				folder.folderId === folderId
					? { ...folder, shared: newValue, url: newUrl }
					: folder
			)
			setFoldersArr(newArray)
			refreshFolders()
		}
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
                setLoadedTweets({ colA: [], colB: [] })
                setDidSaveComponents(false)
				setSelectedFolder(currentFolder)
				setPrevFolder(currentFolder)
			}
		} else {
            setLoadedTweets({ colA: [], colB: [] })
            setDidSaveComponents(false)
			setSelectedFolder(currentFolder)
			setPrevFolder(currentFolder)
		}
	}, [currentFolder])

	useEffect(() => {
		if (gotFolders) {
			return
		}
		if (loggedIn) {
			;(async () => {
				const folders = await getFolders(token)
				if (folders?.error) {
					toast(`Error: ${folders.error}`)
					localStorage.removeItem('state')
					setGotFolders(true)
					setIsLoading(false)
					dispatch({ type: SET_LOGIN, payload: false })
					history.push('/')
					return
				}
				if (folders?.folders) {
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
			editedFolder
				? foldersArr.find((folder) => folder.folderId === editedFolder) || foldersArr[0]
				: prevFolder
				? foldersArr.find((folder) => folder.folderId === prevFolder.folderId)
				: foldersArr[0]
		)
        setEditedFolder(null)
	}, [foldersArr])

    const expand = (tweetCols) => {
        setLoadedTweets(tweetCols)
        setDidSaveComponents(true)
        setViewLarge(true)
    }

    const minimize = () => {
        if (viewLarge) {
            setViewLarge(false)
        }
    }

    const stdView = (
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
										edit={editFolder}
										key='newFolder'
										newFolder={true}
										select={selectFolder}
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
											edit={editFolder}
											key={folder.folderId}
											newFolder={false}
											refresh={refreshFolders}
											select={selectFolder}
											selected={folder.folderId === selectedFolder.folderId}
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
									viewLarge={expand}
									loadedTweets={didSaveComponents ? loadedTweets : null}
								/>
							</Route>
							<Route exact path='/folders/import'>
								<Import refresh={refreshFolders} folder={selectedFolder} />
							</Route>
							<Route exact path='/folders/likes'>
								<Likes refresh={refreshFolders} folder={selectedFolder} />
							</Route>
						</Switch>
					</Col>
				</Row>
			</Container>
		)

	if (!loggedIn) {
		return <Redirect to='/auth' />
	} else {
		if (isLoading) {
			return (
				<div hidden={!isLoading} className='center-spinner'>
					<Spinner color='primary' />
					<div className='text-primary'>Loading...</div>
				</div>
			)
		} else {
			return viewLarge ? <Large 
                sharedFolder={false}
                oneFolder={loadedTweets}
                name={selectedFolder.folderName}
                back={minimize}
            /> : stdView
		}
	}
}

export default Folders
