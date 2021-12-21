import React, { useContext } from 'react'
import { Row, Col } from 'reactstrap'

import { MdDelete, MdEdit } from 'react-icons/md'

import { useHistory } from 'react-router-dom'

import { SET_SINGLE_FOLDER } from '../context/action.types'

import { AppContext } from '../context/Context'

const Tweet = ({tweet, twtId}) => {
	const { state, dispatch } = useContext(AppContext)
	const history = useHistory()

	const deleteTweet = () => {
		// Modal?
		return
	}

	return (
		<Row>
			<Col
				md='10'
				className='d-flex justify-content-center align-items-center text-large cardtxt'
				style={{
					fontWeight: '700',
					fontSize: '32px',
					letterSpacing: '2px',
				}}>
				<div className='name'>{tweet.twtText}</div>
			</Col>
			<Col md='2' className='d-flex justify-content-center align-items-center'>
				<div className='iconbtn mr-4 '>
					<MdDelete
						onClick={() => deleteTweet()}
						color='#FF6370'
						className=' icon'
						style={{ zIndex: '1' }}
					/>
				</div>
			</Col>
		</Row>
	)
}

export default Tweet
