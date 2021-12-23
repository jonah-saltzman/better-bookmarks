import React, { useState, useContext, useEffect } from 'react'

import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap'

import { AppContext } from '../context/Context'

import getTwtUrl from '../newtwturl'

const Home = (props) => {

	const location = props.location
	console.log(`in home, location.search: ${location.search}`)
	if (location.search === '?close') {
		console.log('closing window')
		window.close()
	}

    const { state, dispatch } = useContext(AppContext)
    const { loggedIn, userId, twtChallenge, twtState } = state

	const [showTwtAuth, setShowTwtAuth] = useState(false)
	const [twtAuthUrl, setTwtAuthUrl] = useState("")

	const twtPopup = () => {
		window.open(twtAuthUrl)
	}

	useEffect(() => {
		if (loggedIn && userId) {
			setTwtAuthUrl(getTwtUrl(userId, twtChallenge, twtState))
			setShowTwtAuth(true)
			console.log(`twtChallenge: ${twtChallenge}`)
			console.log(`twtState: ${twtState}`)
		} else {
			setTwtAuthUrl("")
			setShowTwtAuth(false)
		}
	},[loggedIn])

    return (
			<div className='center-home'>
				<Card className='homecard card-fab'>
					<CardTitle>Welcome to Better Bookmarks</CardTitle>
					<CardBody>
							<ul>
								<li>Organize your favorite Tweets into folders</li>
								<li>Share folders with anyone</li>
								<li>No more "This Tweet has been deleted"</li>
							</ul>
							{showTwtAuth ? <span className='link' onClick={twtPopup}>Login with Twitter</span> : null}
					</CardBody>
				</Card>
			</div>
		)
}

export default Home