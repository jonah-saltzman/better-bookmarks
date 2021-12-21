import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/Context'

import { Redirect } from 'react-router-dom'

import {
    SET_LOGIN,
    SET_EMAIL,
    SET_TOKEN,
    SET_FOLDERS
} from '../context/action.types'

const Signout = () => {
    const { state, dispatch } = useContext(AppContext)
    const actions = [SET_LOGIN, SET_EMAIL, SET_TOKEN, SET_FOLDERS]
    actions.forEach(action => dispatch({type: action, payload: null}))
    return (
        <Redirect to='/'></Redirect>
    )
}

export default Signout