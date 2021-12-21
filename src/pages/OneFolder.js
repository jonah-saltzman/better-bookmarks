import React, { useContext, useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import { IoIosArrowBack } from 'react-icons/io'

import {
	Container,
	ListGroup,
	ListGroupItem,
	Spinner,
	Button,
    Row,
    Col
} from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { getOneFolder } from '../api/folders'

import Tweet from '../components/Tweet'

const OneFolder = () => {
    const { state, dispatch } = useContext(AppContext)
    const history = useHistory()
    const { folder, folderName, loggedIn, token } = state

    const [ isLoading, setIsLoading ] = useState(true)
    const [ getTweets, setGetTweets ] = useState(true)
    const [ tweetsArr, setTweetsArr ] = useState([])

    const [ embed, setEmbed ] = useState(true)

    useEffect(() => {
        console.log('single folder page useeffect: folder: ');
        console.log(folder);
        if (!getTweets) {
            return
        }
        if (!folder) {
            return
        }
        if (loggedIn) {
            console.log(`attempting to get single folder: `);
            console.log(folder);
            (async () => {
                const tweets = await getOneFolder(folder, token)
                if (tweets.error) {
                    toast(`Error: ${tweets.error}`)
                    setGetTweets(false)
                    setIsLoading(false)
                    return
                }
                if (tweets.tweets) {
                    console.log('got tweets: ')
                    console.log(tweets.tweets)
                    setTweetsArr(tweets.tweets)
                    setGetTweets(false)
					setIsLoading(false)
                }
            })()
        }
    })

    const back = () => {
        history.push('/folders')
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
        console.log('rendering tweets: ')
        console.log(tweetsArr)
        return (
					<>
						{' '}
						<Container className='tweetcard'>
							<Row>
								<Col md='2'>
									<div className='icon' onClick={() => back()}>
										<IoIosArrowBack size={22} className=' text-white' />
									</div>
								</Col>
								<Col md='8'>
									<div className='folderName'>{folderName}</div>
								</Col>
								<Col md='2'></Col>
							</Row>
						</Container>
						<Container scrollable={true} className='mt-4 mb-5 tweet-list'>
							{tweetsArr.length === 0 && !isLoading ? (
								<div
									className='Center text-large cardtxt'
									style={{
										fontWeight: '700',
										fontSize: '32px',
										letterSpacing: '2px',
									}}>
									No Tweets (yet)!
								</div>
							) : (
								<ListGroup>
									{tweetsArr.map((tweet) => (
										<ListGroupItem key={tweet.twtId} className='tweetcard mb-4'>
											<Tweet embed={embed} tweet={tweet} tweetKey={tweet.twtId} />
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</Container>
					</>
				)
        }
}

export default OneFolder