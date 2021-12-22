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

import { Link } from 'react-router-dom'

import { SET_USER, SET_TOKEN, SET_LOGIN } from '../context/action.types'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

const TWT_URL =
	'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YnEzOGs2Y2pLMWRUTXM2X3dYU1g6MTpjaQ&redirect_uri=http://127.0.0.1:4000/twtauth&scope=tweet.read%20like.read&state=state&code_challenge=InSomnia&code_challenge_method=plain'

const TWTAUTH_PREFIX =
	'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YnEzOGs2Y2pLMWRUTXM2X3dYU1g6MTpjaQ&redirect_uri='

const TWTAUTH_SUFFIX =
	'&scope=tweet.read%20like.read&state=state&code_challenge=InSomnia&code_challenge_method=plain'

const Home = () => {
    const { state, dispatch } = useContext(AppContext)
    const { loggedIn, userId } = state

	const [showTwtAuth, setShowTwtAuth] = useState(false)
	const [twtAuthUrl, setTwtAuthUrl] = useState("")

	const twtPopup = () => {
		window.open(twtAuthUrl)
	}

	useEffect(() => {
		if (loggedIn && userId) {
			setTwtAuthUrl(TWTAUTH_PREFIX + `http://127.0.0.1:4000/twtauth?user=${userId}` + TWTAUTH_SUFFIX)
			setShowTwtAuth(true)
		}
	},[loggedIn])

    return (
			<div className='center-home'>
				<Card className='homecard card-fab'>
					<CardTitle>Welcome to Better Bookmarks</CardTitle>
					<CardBody>
						<CardText>
							<ul>
								<li>Organize your favorite Tweets into folders.</li>
								<li>Share folders with anyone</li>
								<li>No more "This Tweet has been deleted</li>
							</ul>
							{showTwtAuth ? <span onClick={twtPopup}>Login with Twitter</span> : null}
						</CardText>
					</CardBody>
				</Card>
			</div>
		)
}

//<a href={twtAuthUrl} target="_blank" rel="noopener noreferrer">Login with Twitter</a>

// ;<Route
// 	path='/privacy-policy'
// 	component={() => {
// 		window.location.href = 'https://example.com/1234'
// 		return null
// 	}}
// />

export default Home