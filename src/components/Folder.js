import React, { useContext, useEffect, useState } from 'react'
//import { Row, Col, Container, Form, FormGroup } from 'reactstrap'

import { Stack, Form, Row, Col, Container, Modal, ModalBody, ModalTitle, ModalFooter, Button, CloseButton } from 'react-bootstrap'

import { MdDelete, MdEdit } from 'react-icons/md'

import { useHistory  } from 'react-router-dom'

import { SET_SINGLE_FOLDER, SET_SINGLE_FOLDER_NAME } from '../context/action.types'

import { AppContext } from '../context/Context'

import { changeFolderName, deleteFolder, newFolder as createFolder } from '../api/folders'

import { toast } from 'react-toastify'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const Folder = (props) => {
	const { folder, newFolder, refresh, selectFolder, selected } = props
    const { state, dispatch } = useContext(AppContext)
	const { token } = state
	const [editable, setEditable] = useState(false)
	const [folderName, setFolderName] = useState(newFolder ? "" : folder.folderName)
	const [callingAPI, setCallingAPI] = useState(false)
	const [creatingFolder, setCreatingFolder] = useState(false)
	const [editingFolder, setEditingFolder] = useState(false)
	const [showDelete, setShowDelete] = useState(false)
	const [deletingFolder, setDeletingFolder] = useState(false)

    const startDeleteFolder = () => {
		if (showDelete) {
			return
		}
        setShowDelete(true)
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
		if (newFolder) {
			setCreatingFolder(true)
		} else {
			setEditingFolder(true)
		}
		setCallingAPI(true)
	}

	const handleClose = () => {
		if (!showDelete) {
			return
		}
		setShowDelete(false)
		return
	}

	const handleDelete = () => {
		setDeletingFolder(true)
		setShowDelete(false)
		setCallingAPI(true)
	}

	useEffect(() => {
		if (!callingAPI) {
			return
		}
		(async () => {
			let result;
			switch (true) {
				case creatingFolder:
					console.log(`attempting to create folder: ${folderName}`)
					setCreatingFolder(false)
					setCallingAPI(false)
					setFolderName("")
					result = await createFolder(folderName, token)
					break
				case deletingFolder:
					setDeletingFolder(false)
					setCallingAPI(false)
					result = await deleteFolder(folder.folderId, token)
					break
				case editingFolder:
					setEditingFolder(false)
					setCallingAPI(false)
					result = await changeFolderName(folder.folderId, folderName, token)
					break
			}
			if (result.error) {
				toast(result.error, { type: 'error' })
			} else {
				toast(result.message, { type: 'success' })
			}
			refresh()
		})()
	}, [callingAPI])

    const viewFolder = (folderId) => {
        selectFolder(folderId)
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

	const deleteModal = (
		<Modal
			show={showDelete}
			backdrop='static'
			keyboard={false}
			>
				<ModalHeader>
					<ModalTitle>Are you sure you want to delete {folder.folderName}?</ModalTitle>
				</ModalHeader>
				<ModalBody>
					This action cannot be undone.
				</ModalBody>
				<ModalFooter>
					<Button className='btn-secondary' onClick={handleClose}>Cancel</Button>
					<Button className='btn-warning' onClick={handleDelete}>Delete</Button>
				</ModalFooter>
			</Modal>
	)

    return (
			<>
				<Row
					style={{
						width: '100%',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}>
					<Col
						onClick={
							newFolder ? () => editName() : () => viewFolder(folder.folderId)
						}
						xs={'8'}
						className='text-large cardtxt'
						style={{
							fontWeight: '300',
							fontSize: '16px',
							letterSpacing: '1px',
						}}>
						<span className={'link ' + (selected ? 'selected-text' : '')}>
							{editable
								? nameForm
								: folder.folderName.length <= (selected ? 15 : 17)
								? folder.folderName
								: folder.folderName.substring(0, selected ? 13 : 15) + '...'}
						</span>
					</Col>
					<Col xs={'4'} hidden={newFolder} className='float-end'>
						<MdDelete
							onClick={() => startDeleteFolder()}
							color='#FF6370'
							className=' icon'
							style={{
								zIndex: '1',
							}}
						/>
						<MdEdit
							className='icon '
							color='#54eafe'
							onClick={() => editName()}
						/>
					</Col>
				</Row>
				{deleteModal}
			</>
		)
}

export default Folder