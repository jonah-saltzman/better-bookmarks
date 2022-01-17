import React, { useState, useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import twitterLogin from '../sign-in-with-twitter-gray.png.twimg.1920.png'

import { Card, CardBody, CardTitle } from 'reactstrap'

import { AppContext } from '../context/Context'
import { checkTwtAuth } from '../api/auth'
import { SET_TWT_AUTH } from '../context/action.types'

import getTwtUrl from '../functions/newtwturl'

import saveState from '../functions/saveState'

const Twitter = () => {

	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, userId, twtChallenge, twtState, token } = state
	const navigate = useNavigate()

	const [ showTwtAuth, setShowTwtAuth ] = useState(false)
	const [ twtAuthUrl, setTwtAuthUrl ] = useState('')

	const twtPopup = () => {
		localStorage.setItem('twtState', twtState)
		localStorage.setItem('token', token)
		saveState(state, true)
		if (localStorage.getItem('twitter')) {
				window.location.href = twtAuthUrl
		}
	}

	useEffect(() => {
		if (loggedIn && userId) {
			(async () => {
					const result = await checkTwtAuth(token, twtState)
					if (result) {
							dispatch({
									type: SET_TWT_AUTH,
									payload: { authed: true }
							})
							navigate('/folders/likes')
					}
			})()
			setTwtAuthUrl(getTwtUrl(userId, twtChallenge, twtState, null))
			setShowTwtAuth(true)
		} else {
			setTwtAuthUrl('')
			setShowTwtAuth(false)
			navigate('/auth')
		}
	}, [loggedIn])

	return (
		<div className='center-home'>
			<Card className='homecard card-fab center-fab'>
				<CardTitle>Login with Twitter</CardTitle>
				<CardBody>
					{showTwtAuth ? (
						<img
							src={twitterLogin}
							alt='Login with Twitter'
							onClick={twtPopup}
						/>
					) : null}
				</CardBody>
			</Card>
		</div>
	)
}

export default Twitter
