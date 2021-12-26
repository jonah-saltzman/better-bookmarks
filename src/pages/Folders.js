import React, { useContext, useEffect, useState } from 'react'

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

const Folders = () => {
    const { state, dispatch } = useContext(AppContext)

	const { loggedIn, token } = state

    const [ isLoading, setIsLoading ] = useState(true)
    const [ gotFolders, setGotFolders ] = useState(false)
    const [ foldersArr, setFoldersArr ] = useState([])
    const [ currentFolder, setCurrentFolder] = useState(null)
    const [ prevFolder, setPrevFolder ] = useState(null)
    const [ oneFolder, setOneFolder ] = useState({folderId: null})

    const refreshFolders = () => {
        setGotFolders(false)
        setIsLoading(true)
    }

    const selectFolder = (folderId) => {
        if (prevFolder.folderId === folderId) {
            return
        }
        setCurrentFolder(foldersArr.find(folder => folder.folderId === folderId))
    }

    useEffect(() => {
        if (!currentFolder) {
            return
        }
        if (prevFolder) {
            if (
                    currentFolder.folderId === prevFolder.folderId &&
                    currentFolder.tweets.length === prevFolder.tweets.length
                ) {
                    return
                } else {
                    setOneFolder(currentFolder)
                    setPrevFolder(currentFolder)
                }
        } else {
            setOneFolder(currentFolder)
            setPrevFolder(currentFolder)
        }
    }, [currentFolder])

    useEffect(() => {
        if (gotFolders) {
            return
        }
        if (loggedIn) {
            (async () => {
                const folders = await getFolders(token)
                if (folders.error) {
                    toast(`Error: ${folders.error}`)
                    setGotFolders(true)
                    setIsLoading(false)
                    return
                }
                if (folders.folders) {
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
        return (
					<>
						<div hidden={!isLoading} className='Center'>
							<Spinner color='primary' />
							<div className='text-primary'>Loading...</div>
						</div>
						<div hidden={isLoading}>
							<Row>
								<Col md={3}>
									<Container
										scrollable={`true`}
										className='folder-list pt-4 container-fluid no-padding'>
										{foldersArr.length === 0 && !isLoading ? (
											<div
												className='Center text-large cardtxt'
												style={{
													fontWeight: '700',
													fontSize: '32px',
													letterSpacing: '2px',
												}}>
												No folders found!
											</div>
										) : (
											<>
												<div className='folder-listcard mb-4'>
													<Folder
														folder={{ folderName: 'New Folder' }}
                                                        key={'newFolder'}
														newFolder={true}
														refresh={refreshFolders}
													/>
												</div>
												{foldersArr.map((folder) => (
													<div
														className={
															'mb-4 ' +
															(folder.folderId === oneFolder.folderId
																? 'selected-folder'
																: 'folder-listcard')
														}>
														<Folder
															folder={folder}
															key={folder.folderId}
															newFolder={false}
															refresh={refreshFolders}
															selectFolder={selectFolder}
															selected={folder.folderId === oneFolder.folderId}
														/>
													</div>
												))}
											</>
										)}
									</Container>
								</Col>
								<Col md={9}>
									<OneFolder folder={oneFolder}></OneFolder>
								</Col>
							</Row>
						</div>
					</>
				)
    } 
}

export default Folders