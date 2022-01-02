import React, { useState, useContext, useEffect } from 'react'

import { NavLink, useHistory } from 'react-router-dom'

import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap'

import { tokenUrlRE, tokenRE, shareUrlRE, shareRE } from '../constants'

import { SET_SHARED_FOLDER } from '../context/action.types'

import { AppContext } from '../context/Context'

const Home = (props) => {
	const { state, dispatch } = useContext(AppContext)
	const history = useHistory()
	const { loggedIn } = state

	if (props.location.search === '?close') {
		window.close()
	} else if (tokenUrlRE.test(props.location.search)) {
		console.log('received token: ')
		const token = props.location.search.match(tokenRE)[0]
		localStorage.setItem('token', token)
		window.close()
	} else if (shareUrlRE.test(props.location.search)) {
		console.log(`SHARE STRING:`)
		const share = props.location.search.match(shareRE)[0]
		console.log(share)
		dispatch({ type: SET_SHARED_FOLDER, payload: share })
		history.push('/shared')
	}

    return (
			<div className='center-home'>
				<Card className='homecard card-fab'>
					<CardTitle className='text-large'>Welcome to Better Bookmarks</CardTitle>
					<CardBody>
						<ul>
							<li>Organize your favorite Tweets into folders</li>
							<li>Share folders with anyone</li>
							<li>No more "This Tweet has been deleted"</li>
						</ul>
						<div className='center'>
							{loggedIn ? (
								<NavLink
									className='text-white text-large center-item'
									style={{marginTop: '17px'}}
									to='/twitter'>
									Login with Twitter
								</NavLink>
							) : null}
						</div>
					</CardBody>
				</Card>
			</div>
		)
}

export default Home