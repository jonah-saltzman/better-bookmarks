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

import { SET_USER, SET_TOKEN, SET_LOGIN } from '../context/action.types'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

const Home = () => {
    const { state, dispatch } = useContext(AppContext)
    const { showLogout, prevUser } = state

    console.log(`top of Home: showLogout: ${showLogout}, prevUser: ${prevUser}`)

    const [showedLogout, setShowedLogout] = useState(false)

    useEffect(() => {
        console.log(`show logout? ${showLogout}; showED logout? ${showedLogout}`)
        if (showedLogout) {
            return
        }
        if (showLogout) {
            toast(`Logged out ${prevUser}!`, { type: 'success' })
        }
        setShowedLogout(false)
        console.log(`show logout? ${showLogout}; showED logout? ${showedLogout}`)
    }, [showedLogout])
    
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
						</CardText>
					</CardBody>
				</Card>
			</div>
		)
}

export default Home