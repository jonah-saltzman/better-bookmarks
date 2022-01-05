import React, { useContext, useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap'

import twitterLogin from '../twitter_button.png'

import { tokenUrlRE, tokenRE, shareUrlRE, shareRE, BB_URL } from '../constants'

import { SET_SHARED_FOLDER } from '../context/action.types'

import { AppContext } from '../context/Context'

// open(location, '_self').close()

const Home = (props) => {
	const { state, dispatch } = useContext(AppContext)
	const history = useHistory()
	const { loggedIn } = state
    const [showClose, setShowClose] = useState(false)

    function closeWindow() {
            console.log('clicked close')
			window.open('', '_parent', '')
			window.close()
		}

    useEffect(() => {
        if (props.location.search === '?close') {
                    console.log('attempting to close')
					window.close()
					closeWindow()
					setShowClose(true)
				} else if (tokenUrlRE.test(props.location.search)) {
					const token = props.location.search.match(tokenRE)[0]
					localStorage.setItem('token', token)
                    console.log('attempting to close')
					window.close()
					closeWindow()
					setShowClose(true)
				} else if (shareUrlRE.test(props.location.search)) {
					const share = props.location.search.match(shareRE)[0]
					dispatch({ type: SET_SHARED_FOLDER, payload: share })
					history.push('/shared')
				}
				fetch(BB_URL).catch(() => console.log('server appears to be down'))
    }, [])
    
    const stdBody = (
			<>
				<ul>
					<li>Organize your favorite Tweets into folders</li>
					<li>Share folders with anyone</li>
					<li>No more "This Tweet has been deleted"</li>
				</ul>
				<div className='center'>
					{loggedIn ? (
						<img
							className='center-item'
							src={twitterLogin}
							alt='Login with Twitter'
							style={{ width: '20vw' }}
							onClick={() => {
								history.push('/auth')
							}}
						/>
					) : null}
				</div>
			</>
		)

    return (
			<div className='center-home'>
				<Card className='homecard card-fab'>
					<CardTitle className='text-large'>
						{showClose ? 'Login Succeeded' : 'Welcome to Better Bookmarks'}
					</CardTitle>
					<CardBody onClick={() => closeWindow()}>
						{showClose ? 'You may return to the app to continue' : stdBody}
					</CardBody>
				</Card>
			</div>
		)
}

export default Home