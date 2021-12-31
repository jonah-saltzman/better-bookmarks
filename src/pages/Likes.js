import React, { useContext, useEffect, useState } from 'react'

import { Container, ListGroupItem, Spinner, Row, Col } from 'reactstrap'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import Like from '../components/Like'
import getLikes from '../api/likes'
import { bookmarkTweets } from '../api/tweets'

const Likes = ({ folder, refresh }) => {
	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, token, twtAuth } = state

	const [isLoading, setIsLoading] = useState(false)
	const [tweetsArr, setTweetsArr] = useState([])
	const [twtObjs, setTwtObjs] = useState([])
	const [loadedTweets, setLoadedTweets] = useState([])
	const [loadedTweet, setLoadedTweet] = useState('')
	const [addingTweet, setAddingTweet] = useState(null)
	const [addedTweet, setAddedTweet] = useState(false)
	const [embed, setEmbed] = useState(true)
    const [ gotLikes, setGotLikes ] = useState(false)
	const [tweetCols, setTweetCols] = useState({ colA: [], colB: [] })
    const [folderTweets, setFolderTweets] = useState([])
    const [added, setAdded] = useState([])
    const [blur, setBlur] = useState([])

	window.twttr.events.bind('rendered', (event) => {
		setLoadedTweet(event.target.children[0].dataset.tweetId)
	})

    useEffect(() => {
        if (!folder) {
            refresh()
            return
        }
        console.log('folder:')
        console.log(folder)
        console.log('folder tweets')
        console.log(folder.tweets)
        const tweets = folder.tweets?.map(tweet => tweet.twtId)
        setBlur([])
        setAdded([])
        setFolderTweets(tweets)
    }, [folder])

    useEffect(() => {
        console.log('added tweets: ')
        console.log(added)
        console.log('folder tweets: ')
        console.log(folderTweets)
        const newBlur = [...added || [], ...folderTweets || []]
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
				const result = await bookmarkTweets(folder.folderId, [addingTweet], token)
				if (result.error) {
					toast('Failed to add Tweet', { type: 'error' })
				} else {
					toast('Added Tweet to' + folder.folderName, { type: 'success' })
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
			window.twttr.widgets.load()
		}
	}, [addedTweet])

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
		const newObjs = [...twtObjs].map((obj) =>
			loadedTweets.some((twtId) => obj.twtId === twtId)
				? { ...obj, loaded: true }
				: obj
		)
		setTwtObjs(newObjs)
	}, [loadedTweets])

    // Get likes from server
	useEffect(() => {
		if (gotLikes) {
			setIsLoading(false)
			return
		}
		setLoadedTweets([])
		if (loggedIn && twtAuth.authed) {
            setIsLoading(true)
            console.log('trying to get likes')
			console.log(twtAuth)
            ;(async () => {
				const tweets = await getLikes(token)
				if (tweets.error) {
					toast(`Error: ${tweets.error}`)
					setIsLoading(false)
					return
				}
				if (tweets.tweets) {
                    console.log('got tweets:')
                    console.log(tweets.tweets)
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
				loaded: false,
				tweet: {twtId: tweet},
				display: true,
                like: true,
                added: blur.some(id => id === tweet)
			}))
		)
	}, [tweetsArr, blur])

	useEffect(() => {
		if (twtObjs.length === 0) {
			return
		}
        let count = 0
        twtObjs.forEach(tweet => count += (tweet.added ? 1 : 0))
        console.log('number of added tweets: ', count)
		const [colA, colB] = [[], []]
		twtObjs
			.forEach((tweet, i) => {
				i % 2 === 0
					? colA.push(
							<div className={'likecard mb-4 ' + (tweet.added ? 'added' : '')}>
								<Like
									tweet={tweet.tweet}
									embed={tweet.loaded}
									key={tweet.twtId}
									add={addTweet}
									display={tweet.display}
									like={true}
								/>
							</div>
					  )
					: colB.push(
							<div className={'likecard mb-4 ' + (tweet.added ? 'added' : '')}>
								<Like
									tweet={tweet.tweet}
									embed={tweet.loaded}
									key={tweet.twtId}
									add={addTweet}
									display={tweet.display}
									like={true}
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
                        <>
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
                        </>
            )
        } else {
            return (
                <Redirect to='/twitter' />
            )
        }
	}
}

export default Likes
