import React, { useState, useContext, useEffect, useRef } from 'react'

import twitterLogin from '../sign-in-with-twitter-gray.png.twimg.1920.png'

import { NavLink } from 'react-router-dom'

import { Card, CardBody, CardTitle } from 'reactstrap'

import { AppContext } from '../context/Context'
import { checkTwtAuth } from '../api/auth'
import { toast } from 'react-toastify'
import { useInViewport } from 'react-in-viewport'
import { SET_TWT_AUTH } from '../context/action.types'

import getTwtUrl from '../newtwturl'

const Twitter = (props) => {

	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, userId, twtChallenge, twtState, token } = state

	const [ showTwtAuth, setShowTwtAuth ] = useState(false)
	const [ twtAuthUrl, setTwtAuthUrl ] = useState('')
    const [ clickedLogin, setClickedLogin ] = useState(false)
    const [ leftPage, setLeftPage ] = useState(false)

	const twtPopup = () => {
		window.open(twtAuthUrl)
	}

    const checkAuth = async () => {
        console.log(`checking auth, clicked: ${clickedLogin}, left: ${leftPage}`)
        console.log(`twtState: `, twtState)
        const result = await checkTwtAuth(token, twtState)
        if (result) {
            toast('Signed in to Twitter!', { type: 'success' })
            const authObj = {
                authed: true,
                twtId: null,
                twtToken: null,
                twtSecret: null
            }
            dispatch({
                type: SET_TWT_AUTH,
                payload: authObj
            })
        } else {
            toast('Twitter sign-in failed', { type: 'error' })
        }
    }

    const onVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            if (leftPage && clickedLogin) {
                checkAuth()
                setLeftPage(false)
                setClickedLogin(false)
            }
        } else {
            setLeftPage(true)
        }
    }

    useEffect(() => {
        console.log('adding listener')
        document.addEventListener('visibilitychange', onVisibilityChange)
        return () => {
            console.log('removing listener')
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    })

	useEffect(() => {
		if (loggedIn && userId) {
			setTwtAuthUrl(getTwtUrl(userId, twtChallenge, twtState))
			setShowTwtAuth(true)
		} else {
			setTwtAuthUrl('')
			setShowTwtAuth(false)
		}
	}, [loggedIn])

    const handleClick = () => {
        twtPopup()
        setClickedLogin(true)
    }

	return (
		<div className='center-home'>
			<Card className='homecard card-fab'>
				<CardTitle>Login with Twitter</CardTitle>
				<CardBody>
					{showTwtAuth ? (
						<img
							src={twitterLogin}
							alt='Login with Twitter'
							onClick={handleClick}
						/>
					) : null}
				</CardBody>
			</Card>
		</div>
	)
}

export default Twitter
