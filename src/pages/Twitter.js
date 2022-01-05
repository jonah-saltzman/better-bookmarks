import React, { useState, useContext, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import twitterLogin from '../sign-in-with-twitter-gray.png.twimg.1920.png'

import { Card, CardBody, CardTitle } from 'reactstrap'

import { AppContext } from '../context/Context'
import { checkTwtAuth } from '../api/auth'
import { toast } from 'react-toastify'
import { SET_TWT_AUTH } from '../context/action.types'

import getTwtUrl from '../functions/newtwturl'

import saveState from '../functions/saveState'

const Twitter = () => {

	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, userId, twtChallenge, twtState, token } = state
    const history = useHistory()

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

    // const checkAuth = async () => {
    //     const result = await checkTwtAuth(token, twtState)
    //     if (result) {
    //         toast('Signed in to Twitter!', { type: 'success' })
    //         const authObj = {
    //             authed: true,
    //             twtId: null,
    //             twtToken: null,
    //             twtSecret: null
    //         }
    //         dispatch({
    //             type: SET_TWT_AUTH,
    //             payload: authObj
    //         })
    //         history.push('/folders/likes')
    //     } else {
    //         toast('Twitter sign-in failed, try again', { type: 'error' })
    //     }
    // }

    // const onVisibilityChange = () => {
    //     if (document.visibilityState === 'visible') {
    //         if (leftPage && clickedLogin) {
    //             checkAuth()
    //             setLeftPage(false)
    //             setClickedLogin(false)
    //         }
    //     } else {
    //         setLeftPage(true)
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener('visibilitychange', onVisibilityChange)
    //     return () => {
    //         document.removeEventListener('visibilitychange', onVisibilityChange)
    //     }
    // })

	useEffect(() => {
		if (loggedIn && userId) {
            (async () => {
                const result = await checkTwtAuth(token, twtState)
                if (result) {
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
                    history.push('/folders/likes')
                }
            })()
			setTwtAuthUrl(getTwtUrl(userId, twtChallenge, twtState, null))
			setShowTwtAuth(true)
		} else {
			setTwtAuthUrl('')
			setShowTwtAuth(false)
            history.push('/auth')
		}
	}, [loggedIn])

    const handleClick = () => {
        twtPopup()
        // setClickedLogin(true)
    }

	return (
		<div className='center-home'>
			<Card className='homecard card-fab center-fab'>
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
