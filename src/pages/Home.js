import React, { useState, useContext, useEffect } from 'react'

import { NavLink } from 'react-router-dom'

import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap'

import { AppContext } from '../context/Context'

import getTwtUrl from '../newtwturl'

const tokenUrlRE = new RegExp(/\?token=/i)
const tokenRE = new RegExp(/(?<=^\?token=).+/i)

const Home = (props) => {

	console.log(props.location.search)

	if (props.location.search === '?close') {
		window.close()
	}

	if (tokenUrlRE.test(props.location.search)) {
		console.log('received token: ')
		const token = props.location.search.match(tokenRE)[0]
		localStorage.setItem('token', token)
		window.close()
	}

    const { state, dispatch } = useContext(AppContext)
    const { loggedIn } = state

    return (
			<div className='center-home'>
				<Card className='homecard card-fab'>
					<CardTitle className='text-large'>Welcome to Better Bookmarks</CardTitle>
					<CardBody>
						<ul>
							<li>Organize your favorite Tweets into folders</li>
							<li>Share folders with anyone</li>
							<li>No more "This Tweet has been deleted"</li>
						</ul>
						<div className='center'>
							{loggedIn ? (
								<NavLink
									className='text-white text-large center-item'
									style={{marginTop: '17px'}}
									to='/twitter'>
									Login with Twitter
								</NavLink>
							) : null}
						</div>
					</CardBody>
				</Card>
			</div>
		)
}

export default Home