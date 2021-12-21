import React, { useContext } from 'react'

import {
	Container,
	ListGroup,
	ListGroupItem,
	Spinner,
	Button,
} from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

// import {  } from '../context/action.types'

const Folders = () => {
    const { state, dispatch } = useContext(AppContext)

	const { signIn, inAuth, loggedIn, isLoading } = state

    if (loggedIn) {
        
    }

    if (!loggedIn) {
        return (
            <Redirect to='/auth'></Redirect>
        )
    } else if (isLoading) {
        return (
			<div className='Center'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
    } else {
        return 
    }
}

export default Folders