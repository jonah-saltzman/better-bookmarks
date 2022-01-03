import React, { useContext } from 'react'

import { useHistory } from 'react-router-dom'

import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap'

import twitterLogin from '../twitter_button.png'

import { tokenUrlRE, tokenRE, shareUrlRE, shareRE, BB_URL } from '../constants'

import { SET_SHARED_FOLDER } from '../context/action.types'

import { AppContext } from '../context/Context'

const Home = (props) => {
	const { state, dispatch } = useContext(AppContext)
	const history = useHistory()
	const { loggedIn } = state

	if (props.location.search === '?close') {
		window.close()
	} else if (tokenUrlRE.test(props.location.search)) {
		const token = props.location.search.match(tokenRE)[0]
		localStorage.setItem('token', token)
		window.close()
	} else if (shareUrlRE.test(props.location.search)) {
		const share = props.location.search.match(shareRE)[0]
		dispatch({ type: SET_SHARED_FOLDER, payload: share })
		history.push('/shared')
	}

	fetch(BB_URL)

    return (
			<div className='center-home'>
				<Card className='homecard card-fab'>
					<CardTitle className='text-large'>
						Welcome to Better Bookmarks
					</CardTitle>
					<CardBody>
						<ul>
							<li>Organize your favorite Tweets into folders</li>
							<li>Share folders with anyone</li>
							<li>No more "This Tweet has been deleted"</li>
						</ul>
						<div className='center'>
							{loggedIn ? (
								<img
									className='center-item'
									src={twitterLogin}
									alt='Login with Twitter'
									style={{width: '20vw'}}
									onClick={() => {
										history.push('/twitter')
									}}
								/>
							) : null}
						</div>
					</CardBody>
				</Card>
			</div>
		)
}

export default Home