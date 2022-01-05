import React, { useContext, useEffect, useState } from 'react'

import { Container, Spinner, Row, Col } from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect, useHistory } from 'react-router-dom'

import Like from '../components/Like'
import getLikes from '../api/likes'
import { bookmarkTweets } from '../api/tweets'

import { allActions as actions } from '../constants'

const Likes = ({ folder, refresh }) => {
	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, token, twtAuth } = state
	const history = useHistory()

	const [isLoading, setIsLoading] = useState(false)
	const [tweetsArr, setTweetsArr] = useState([])
	const [twtObjs, setTwtObjs] = useState([])
	const [addingTweet, setAddingTweet] = useState(null)
	const [addedTweet, setAddedTweet] = useState(false)
	const [gotLikes, setGotLikes] = useState(false)
	const [tweetCols, setTweetCols] = useState({ colA: [], colB: [] })
	const [folderTweets, setFolderTweets] = useState([])
	const [added, setAdded] = useState([])
	const [blur, setBlur] = useState([])

	useEffect(() => {
		if (!folder) {
			refresh()
			return
		}
		const tweets = folder.tweets?.map((tweet) => tweet.twtId)
		setBlur([])
		setAdded([])
		setFolderTweets(tweets)
	}, [folder])

	useEffect(() => {
		const newBlur = [...(added || []), ...(folderTweets || [])]
		setBlur(newBlur)
	}, [added, folderTweets])

	const addTweet = (twtId) => {
		if (addingTweet) {
			return
		}
		setAddingTweet(twtId)
	}

	useEffect(() => {
		if (!addingTweet) {
			return
		} else {
			;(async () => {
				const result = await bookmarkTweets(
					folder.folderId,
					[addingTweet],
					token
				)
				if (result.error) {
					toast('Failed to add Tweet', { type: 'error' })
				} else {
					toast('Added Tweet to ' + folder.folderName, { type: 'success' })
					setAddedTweet(true)
				}
			})()
		}
	}, [addingTweet])

	useEffect(() => {
		if (!addedTweet) {
			return
		} else {
			const newAdded = [...added]
			newAdded.push(addingTweet)
			setAdded(newAdded)
			setAddingTweet(null)
			setAddedTweet(false)
			//window.twttr.widgets.load()
		}
	}, [addedTweet])

	// Get likes from server
	useEffect(() => {
		if (gotLikes) {
			setIsLoading(false)
			return
		}
		if (loggedIn && twtAuth.authed) {
			setIsLoading(true)
			;(async () => {
				const tweets = await getLikes(token)
				if (tweets.error) {
					toast(`Error: ${tweets.error}`)
					localStorage.removeItem('state')
					actions.forEach((action) => dispatch({ type: action, payload: null }))
					history.push('/')
					setIsLoading(false)
					return
				}
				if (tweets.tweets) {
					setGotLikes(true)
					setTweetsArr(tweets.tweets)
				}
			})()
		}
	}, [gotLikes])

	useEffect(() => {
		if (tweetsArr.length === 0) {
			setTweetCols({ colA: [], colB: [] })
			return
		}
		setTwtObjs(
			tweetsArr.map((tweet) => ({
				twtId: tweet,
				added: blur.some((id) => id === tweet),
			}))
		)
	}, [tweetsArr, blur])

	useEffect(() => {
		if (twtObjs.length === 0) {
			return
		}
		const [colA, colB] = [[], []]
		twtObjs.forEach((tweet, i) => {
			i % 2 === 0
				? colA.push(
						<div
							key={tweet.twtId + 'div'}
							className={'likecard mb-4 ' + (tweet.added ? 'added' : '')}>
							<Like
								tweet={tweet.twtId}
								key={tweet.twtId}
								add={addTweet}
								folder={folder.folderName}
							/>
						</div>
				  )
				: colB.push(
						<div
							key={tweet.twtId + 'div'}
							className={'likecard mb-4 ' + (tweet.added ? 'added' : '')}>
							<Like
								tweet={tweet.twtId}
								key={tweet.twtId}
								add={addTweet}
								folder={folder.folderName}
							/>
						</div>
				  )
		})
		setTweetCols({ colA: colA, colB: colB })
	}, [twtObjs])

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
		if (twtAuth.authed) {
			return (
				<Container scrollable={`true`} className='mt-4 mb-5 tweet-list'>
					{tweetsArr.length === 0 && !isLoading ? (
						<div
							className='Center text-large cardtxt'
							style={{
								fontWeight: '700',
								fontSize: '32px',
								letterSpacing: '2px',
							}}>
							No Likes (yet)!
						</div>
					) : (
						<Row>
							<Col>{tweetCols.colA}</Col>
							<Col>{tweetCols.colB}</Col>
						</Row>
					)}
				</Container>
			)
		} else {
			return <Redirect to='/twitter' />
		}
	}
}

export default Likes
