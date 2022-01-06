import {
	SET_USER,
	SET_TOKEN,
	SET_LOGIN,
	SET_USER_ID,
	SET_TWT_CHALLENGE,
	SET_TWT_STATE,
	SET_OFFLINE,
	SET_SAVED_STATE,
    SET_TWT_AUTH
} from '../context/action.types'

import { twitterLogin, checkTwtAuth } from '../api/auth'

import { toast } from 'react-toastify'

export const twtAuthLanding = async (dispatch) => {
    const token = localStorage.getItem('token')
    const twtState = localStorage.getItem('twtState')
    if (twtState && token) {
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
            toast('Twitter authentication succeeded!', { type: 'success'})
            localStorage.removeItem('token')
            localStorage.removeItem('twtState')
            return true
        } else {
            toast('Twitter authentication failed, please try again', { type: 'error' })
            localStorage.removeItem('token')
            localStorage.removeItem('twtState')
            return false
        }
    } else {
        return false
    }
}

export const checkForToken = async (token, dispatch) => {
    const offline = localStorage.getItem('offline')
    const staySignedIn = offline === 'true'
    const twtState = localStorage.getItem('twtState')
    if (token && twtState) {
        const authResult = await twitterLogin(token)
        if (authResult.error) {
            toast(authResult.error, { type: 'error' })
            return null
        } else {
            toast(authResult.success, { type: 'success' })
            setCredentials(null, authResult, staySignedIn, twtState, dispatch)
            return true
        }
    } else {
        toast('Twitter login failed, try refreshing', { type: 'error' })
        return false
    }
}

export const setCredentials = (email, authResult, staySignedIn, twtState, dispatch) => {
	dispatch({
		type: SET_USER,
		payload: {
			userName: email ? email : authResult.twtUser,
			displayName: email ? email : authResult.twtName,
			twt: authResult.twt,
		},
	})
	dispatch({
		type: SET_TWT_STATE,
		payload: twtState,
	})
	dispatch({
		type: SET_TOKEN,
		payload: authResult.token,
	})
	dispatch({
		type: SET_USER_ID,
		payload: authResult.userId,
	})
	dispatch({
		type: SET_TWT_CHALLENGE,
		payload: authResult.twtChallenge,
	})
	dispatch({
		type: SET_LOGIN,
		payload: true,
	})
	dispatch({
		type: SET_OFFLINE,
		payload: staySignedIn,
	})
	dispatch({
		type: SET_SAVED_STATE,
		payload: false,
	})
	localStorage.removeItem('token')
    localStorage.removeItem('twtState')
    localStorage.removeItem('offline')
}