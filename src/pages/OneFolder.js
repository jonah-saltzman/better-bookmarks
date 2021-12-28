import React, { useContext, useEffect, useState } from 'react'

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

const OneFolder = ({folder}) => {
	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, token } = state

	const [isLoading, setIsLoading] = useState(true)
	const [tweetsArr, setTweetsArr] = useState([])
	const [twtObjs, setTwtObjs] = useState([])
	const [noFolder, setNoFolder] = useState(false)
	const [loadedTweets, setLoadedTweets] = useState([])
	const [loadedTweet, setLoadedTweet] = useState('')

	const [embed, setEmbed] = useState(true)

	const [tweetRows, setTweetRows] = useState([])

	const loadTweet = (twtId, loaded, ref) => {
		window.twttr.widgets.load(document.getElementById(`${ref}`))
		window.twttr.events.bind('rendered', (event) => {
			setLoadedTweet(event.target.children[0].dataset.tweetId)
		})
	}

	useEffect(() => {
		if (loadedTweets.includes(loadedTweet) || loadedTweet === '') {
			return
		} else {
			const newArr = [...loadedTweets]
			newArr.push(loadedTweet)
			setLoadedTweets(newArr)
		}
	}, [loadedTweet])

	useEffect(() => {
		const newObjs = [...twtObjs].map(obj => 
			(loadedTweets.some(twtId => obj.twtId === twtId)
				? {...obj, loaded: true}
				: obj
				)
		)
		setTwtObjs(newObjs)
	}, [loadedTweets])

	useEffect(() => {
		if (!folder || folder.folderId === null) {
			setIsLoading(false)
			setNoFolder(true)
			return
		}
		if (loggedIn) {
			;(async () => {
				const tweets = await getOneFolder(folder.folderId, token)
				if (tweets.error) {
					toast(`Error: ${tweets.error}`)
					setIsLoading(false)
					return
				}
				if (tweets.tweets) {
					setNoFolder(false)
					setTweetsArr(tweets.tweets)
					setIsLoading(false)
				}
			})()
		}
	}, [folder])

	useEffect(() => {
		if (tweetsArr.length === 0) {
			setTweetRows([])
			return
		}
		if (twtObjs.length !== 0) {
			return
		}
		setTwtObjs(
			tweetsArr.map((tweet) => ({
				twtId: tweet.twtId,
				loaded: false,
				tweet: tweet,
			}))
		)
	}, [tweetsArr])

	useEffect(() => {
		if (twtObjs.length === 0) {
			return
		}
		const [colA, colB] = [[], []]
		twtObjs.forEach((tweet, i) => {
			i % 2 === 0
				? colA.push(
						<ListGroupItem key={tweet.twtId} className='tweetcard mb-4'>
							<Tweet
								load={loadTweet}
								tweet={tweet.tweet}
								embed={tweet.loaded}
								key={tweet.twtId}
							/>
						</ListGroupItem>
				  )
				: colB.push(
						<ListGroupItem key={tweet.twtId} className='tweetcard mb-4'>
							<Tweet
								load={loadTweet}
								tweet={tweet.tweet}
								embed={tweet.loaded}
								key={tweet.twtId}
							/>
						</ListGroupItem>
				  )
		})
		const rows = []
		for (let i = 0; i < colA.length; i++) {
			rows.push(
				<Row key={i}>
					<Col>{colA[i]}</Col>
					<Col>{colB[i] ? colB[i] : null}</Col>
				</Row>
			)
		}
		setTweetRows(rows)
	}, [twtObjs])

	const toggleEmbed = () => {
		setEmbed(!embed)
	}

	if (!loggedIn) {
		return <Redirect to='/auth'></Redirect>
	} else if (isLoading) {
		return (
			<div className='Center'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
	} else {
		return (
			<>
				{' '}
				{!noFolder ? (<Container className='folder-title'>
					<Row className='justify-content-md-center'>
						<Col md='auto'>
							<div className='folderName'>{folder.folderName}</div>
						</Col>
					</Row>
				</Container>) : null}
				<Container scrollable={`true`} className='mt-4 mb-5 tweet-list'>
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
							<Container>{tweetRows}</Container>
						</ListGroup>
					)}
				</Container>
			</>
		)
	}
}

export default OneFolder