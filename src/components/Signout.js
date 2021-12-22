import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/Context'
import { toast } from 'react-toastify'

import PREFIX from '../prefix'

import { logout } from '../api/auth'

import { Spinner } from 'reactstrap'

import {
	SET_LOGIN,
	SET_USER,
	SET_TOKEN,
	SET_FOLDERS,
	SET_SHOW_LOGOUT,
	SET_PREV_USER,
} from '../context/action.types'
import { Redirect } from 'react-router-dom'

const Signout = () => {
    const { state, dispatch } = useContext(AppContext)
    const { token } = state

    const [signedOut, setSignedOut] = useState(false)
    const [signingOut, setSigningOut] = useState(true)
    const [prevUser, setPrevUser] = useState(`${state.user}`)
    
    useEffect(() => {
        console.log(`top of logout useeffect: signingOut: ${signingOut}`);
        if (!signingOut) {
            console.log(`signingOut updated but skipping signout`);
            return
        }
        (async () => {
            const authResult = await logout(token)
            await handleSignout(authResult)
        })()
        setSigningOut(false)
    }, [signingOut])

    const handleSignout = async (result) => {
        if (result.error) {
        } else {
            const actions = [SET_USER, SET_LOGIN, SET_TOKEN, SET_FOLDERS]
            actions.forEach(action => dispatch({ type: action, payload: null }))
            dispatch({
                action: SET_SHOW_LOGOUT,
                payload: true
            })
            dispatch({
                action: SET_PREV_USER,
                payload: prevUser
            })
            setSignedOut(true)
        }
    }

    if (signedOut) {
        return (
            <Redirect to={PREFIX + '/'} />
        )
    } else {
        return (
            <div className='Center'>
				<Spinner color='primary' />
				<div className='text-primary'>Signing out...</div>
			</div>
        )
    }
}

export default Signout