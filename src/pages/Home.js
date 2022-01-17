import React, { useContext, useEffect } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap'

import twitterLogin from '../twitter_button.png'

import { tokenUrlRE, tokenRE, shareUrlRE, shareRE, BB_URL } from '../constants'

import { SET_SHARED_FOLDER } from '../context/action.types'

import { AppContext } from '../context/Context'

import { checkForToken, twtAuthLanding } from '../functions/authfunctions'

const Home = (props) => {
	const { state, dispatch } = useContext(AppContext)
	const navigate = useNavigate()
	const { loggedIn, offline } = state
	const location = useLocation()

    useEffect(() => {
        if (location.search === '?close') {
            if (twtAuthLanding(dispatch)) {
                if (!offline) {
                    localStorage.removeItem('state')
                }
                navigate('/folders/likes')
            }
        } else if (tokenUrlRE.test(location.search)) {
            const token = location.search.match(tokenRE)[0]
            if (checkForToken(token, dispatch)) {
                navigate('/folders/view')
            }
        } else if (shareUrlRE.test(location.search)) {
            const share = location.search.match(shareRE)[0]
            dispatch({ type: SET_SHARED_FOLDER, payload: share })
            navigate('/shared')
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
								navigate('/twitter')
							}}
						/>
					) : (<a className='link example' href='https://bookmarks.jonahsaltzman.dev/?share=4HUUImhgC-TXl3H'>Check out a Shared Folder!</a>)}
				</div>
			</>
		)

    return (
			<div className='center-home'>
				<Card className='homecard card-fab'>
					<CardTitle className='text-large'>
						{'Welcome to Better Bookmarks'}
					</CardTitle>
					<CardBody>
						{stdBody}
					</CardBody>
				</Card>
			</div>
		)
}

export default Home