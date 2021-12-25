import React, { useContext, useEffect, useState } from 'react'

import {
	Container,
	ListGroup,
	ListGroupItem,
	Spinner,
	Button,
    Row,
    Col
} from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { getFolders } from '../api/folders'

import Folder from '../components/Folder'

import OneFolder from './OneFolder'

// import {  } from '../context/action.types'

const Folders = () => {
    const { state, dispatch } = useContext(AppContext)

	const { loggedIn, token } = state

    const [ isLoading, setIsLoading ] = useState(true)
    const [ gotFolders, setGotFolders ] = useState(false)
    const [ foldersArr, setFoldersArr ] = useState([])
    const [ currentFolder, setCurrentFolder] = useState(null)
    const [ prevFolder, setPrevFolder ] = useState(null)
    const [ oneFolder, setOneFolder ] = useState(null)

    const refreshFolders = () => {
        console.log('refreshing folders...')
        setGotFolders(false)
        setIsLoading(true)
    }

    const selectFolder = (folderId) => {
        if (prevFolder.folderId === folderId) {
            return
        }
        console.log(`selecting folder ${folderId}`)
        setCurrentFolder(foldersArr.find(folder => folder.folderId === folderId))
    }

    useEffect(() => {
        console.log(`currentFolder useeffect called on: `)
        console.log(currentFolder)
        if (!currentFolder) {
            console.log('first render')
            return
        }
        if (prevFolder) {
            console.log(`there was a prev folder...`)
            console.log(prevFolder)
            if (
                    currentFolder.folderId === prevFolder.folderId &&
                    currentFolder.tweets.length === prevFolder.tweets.length
                ) {
                    console.log('prev folder is the same as selected folder')
                    return
                } else {
                    console.log('prev folder not the same as selected folder')
                    setOneFolder(currentFolder)
                    setPrevFolder(currentFolder)
                }
        } else {
            console.log('there was not a previous folder')
            console.log('setting onefolder as: ')
            console.log(currentFolder)
            setOneFolder(currentFolder)
            setPrevFolder(currentFolder)
        }
    }, [currentFolder])

    useEffect(() => {
        console.log('oneFolder updated')
    },[oneFolder])

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
            console.log('empty folders array, returning')
            return
        }
        console.log('foldersArr updated:')
        console.log(foldersArr)
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
            <Redirect to='/auth'></Redirect>
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
										className='folder-list pt-4'>
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
												{foldersArr.map((folder) => (
													<div
														key={folder.folderId}
														className='folder-listcard mb-4'>
														<Folder
															folder={folder}
															folderKey={folder.folderId}
															newFolder={false}
															refresh={refreshFolders}
															selectFolder={selectFolder}
														/>
													</div>
												))}
												<div key='newFolder' className='folder-listcard mt-4'>
													<Folder
														folder={{ folderName: 'New Folder' }}
														newFolder={true}
														refresh={refreshFolders}
													/>
												</div>
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