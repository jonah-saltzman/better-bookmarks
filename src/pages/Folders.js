import React, { useContext, useEffect, useState } from 'react'

import {
	Container,
	ListGroup,
	ListGroupItem,
	Spinner,
	Button,
} from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { getFolders } from '../api/folders'

import Folder from '../components/Folder'

// import {  } from '../context/action.types'

const Folders = () => {
    const { state, dispatch } = useContext(AppContext)

	const { loggedIn, token } = state

    const [ isLoading, setIsLoading ] = useState(true)
    const [ gotFolders, setGotFolders ] = useState(false)
    const [ foldersArr, setFoldersArr ] = useState([])

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
                    console.log('got folders: ')
                    console.log(folders.folders)
                    setFoldersArr(folders.folders)
                    setGotFolders(true)
					setIsLoading(false)
                }
            })()
        }
    }, [gotFolders])

    if (!loggedIn) {
        return (
            <Redirect to='/auth'></Redirect>
        )
    } else if (isLoading) {
        return (
			<div className='Center'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
    } else {
        console.log('rendering folders: ')
        console.log(foldersArr)
        return (
					<Container className='mt-4 mb-5 folder-list'>
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
							<ListGroup>
								{foldersArr.map(folder => (
									<ListGroupItem key={folder.folderId} className='listcard mt-4'>
										<Folder folder={folder} folderKey={folder.folderId} />
									</ListGroupItem>
								))}
							</ListGroup>
						)}
					</Container>
				)
    }
}

export default Folders