import React, { useState, useContext, useEffect } from 'react'

import {
	Container,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Spinner,
	Row,
	Col,
} from 'reactstrap'

import { AppContext } from '../context/Context'

import { TWTAUTH_PREFIX, TWTAUTH_SUFFIX } from '../constants'

const Home = (props) => {

	const location = props.location
	console.log(`in home, location.search: ${location.search}`)
	if (location.search === '?close') {
		console.log('closing window')
		window.close()
	}

    const { state, dispatch } = useContext(AppContext)
    const { loggedIn, userId } = state

	const [showTwtAuth, setShowTwtAuth] = useState(false)
	const [twtAuthUrl, setTwtAuthUrl] = useState("")

	const twtPopup = () => {
		window.open(twtAuthUrl)
	}

	useEffect(() => {
		if (loggedIn && userId) {
			setTwtAuthUrl(TWTAUTH_PREFIX + userId + TWTAUTH_SUFFIX)
			setShowTwtAuth(true)
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