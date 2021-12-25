import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Form, FormGroup } from 'reactstrap'

import { MdDelete, MdEdit } from 'react-icons/md'

import { useHistory  } from 'react-router-dom'

import { SET_SINGLE_FOLDER, SET_SINGLE_FOLDER_NAME } from '../context/action.types'

import { AppContext } from '../context/Context'

import { newFolder as createFolder } from '../api/folders'

import { toast } from 'react-toastify'

const Folder = ({folder, folderKey, newFolder, refresh, selectFolder}) => {
    const { state, dispatch } = useContext(AppContext)
	const { token } = state
    const history = useHistory()
	const [editable, setEditable] = useState(false)
	const [folderName, setFolderName] = useState(newFolder ? "" : folder.folderName)
	const [callingAPI, setCallingAPI] = useState(false)
	const [creatingFolder, setCreatingFolder] = useState(false)
	const [editingFolder, setEditingFolder] = useState(false)

    const updateFolder = () => {
        // Modal?
        return
    }

    const deleteFolder = () => {
        // Modal?
        return
    }

	const editName = () => {
		if (editable) {
			return
		}
		setEditable(true)
	}

	const cancelEdit = () => {
		if (!editable) {
			return
		}
		setEditable(false)
		setFolderName(newFolder ? "" : folder.folderName)
	}

	const handleNewFolder = async (event) => {
		event.preventDefault()
		setEditable(false)
		setCreatingFolder(true)
		setCallingAPI(true)
	}

	useEffect(() => {
		if (!callingAPI) {
			return
		}
		(async () => {
			switch (true) {
				case creatingFolder:
					console.log(`attempting to create folder: ${folderName}`)
					setCreatingFolder(false)
					setCallingAPI(false)
					setFolderName("")
					const created = await createFolder(folderName, token)
					if (created.error) {
						toast(created.error, { type: 'error' })
					} else {
						toast(created.message, { type: 'success' })
						refresh()
					}
			}
		})()
	})

    const viewFolder = (folderId) => {
        selectFolder(folderId)
        //history.push('/onefolder')
    }

	const nameForm = (
		<Form onSubmit={handleNewFolder}>
			<input
				className='folder-input'
				type='text'
				name='folderName'
				id='folderName'
				placeholder={`${folder.folderName}`}
				value={folderName}
				onChange={(e) => setFolderName(e.target.value)}
				onBlur={() => {cancelEdit()}}
				autoFocus
			/>
		</Form>
	)

    return (
			<Container>
				<Row>
					<Col
						onClick={newFolder ? () => editName() : () => viewFolder(folderKey)}
						md={'auto'}
						className='justify-content-center align-items-center text-large cardtxt'
						style={{
							fontWeight: '300',
							fontSize: '16px',
							letterSpacing: '1px',
						}}>
						{editable ? nameForm : folder.folderName}
					</Col>
					<Col
						hidden={newFolder}
						className='justify-content-right align-items-right float-right'
						md={{ span: 4, offset: 3 }}>
						<MdDelete
							onClick={() => deleteFolder()}
							color='#FF6370'
							className=' icon'
							style={{
								zIndex: '1',
								display: 'inline-block',
							}}
						/>
						<MdEdit
							className='icon '
							color='#54eafe'
							style={{ display: 'inline-block'}}
							onClick={() => updateFolder()}
						/>{' '}
					</Col>
				</Row>
			</Container>
		)
}

export default Folder