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

import { Link } from 'react-router-dom'

import { SET_USER, SET_TOKEN, SET_LOGIN } from '../context/action.types'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

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
			setTwtAuthUrl(TWTAUTH_PREFIX + userId + TWTAUTH_SUFFIX)
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

export default Home