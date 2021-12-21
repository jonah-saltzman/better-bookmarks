import React, { useContext } from 'react'
import { Row, Col } from 'reactstrap'

import { MdDelete, MdEdit } from 'react-icons/md'

import { useHistory  } from 'react-router-dom'

import { SET_SINGLE_FOLDER, SET_SINGLE_FOLDER_NAME } from '../context/action.types'

import { AppContext } from '../context/Context'

const Folder = ({folder, folderKey}) => {
    const { state, dispatch } = useContext(AppContext)
    const history = useHistory()

    const updateFolder = () => {
        // Modal?
        return
    }

    const deleteFolder = () => {
        // Modal?
        return
    }

    const viewFolder = (folderId) => {
		console.log(`clicked folder ${folderId}`)
        dispatch({
					type: SET_SINGLE_FOLDER,
					payload: folderId,
				})
		dispatch({
				type: SET_SINGLE_FOLDER_NAME,
				payload: folder.folderName,
		})
        history.push('/onefolder')
    }

    return (
			<Row>
				<Col
					onClick={() => viewFolder(folderKey)}
					md='10'
					className='d-flex justify-content-center align-items-center text-large cardtxt'
					style={{
						fontWeight: '700',
						fontSize: '32px',
						letterSpacing: '2px',
					}}>
					<div className='name'>{folder.folderName}</div>
				</Col>
				<Col
					md='2'
					className='d-flex justify-content-center align-items-center'>
					<div className='iconbtn mr-4 '>
						<MdDelete
							onClick={() => deleteFolder()}
							color='#FF6370'
							className=' icon'
							style={{ zIndex: '1' }}
						/>
					</div>
					<div className='iconbtn mr-5' style={{ marginRight: '30px' }}>
						<MdEdit
							className='icon '
							color='#54eafe'
							onClick={() => updateFolder()}
						/>{' '}
					</div>
				</Col>
			</Row>
		)
}

export default Folder