import React, { useContext, useEffect, useState } from 'react'

import {
	Container,
	Spinner,
	Row,
	Col,
} from 'reactstrap'

import { BsToggleOff, BsToggleOn} from 'react-icons/bs'
import { FaExpandAlt } from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect, useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { getOneFolder } from '../api/folders'
import { deleteTweet as remove } from '../api/tweets'

import { SHARE_PREFIX, allActions as actions } from '../constants'


import Tweet from '../components/Tweet'

const OneFolder = ({ folder, share, viewLarge, loadedTweets }) => {
	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, token } = state
	const history = useHistory()

	const [isLoading, setIsLoading] = useState(true)
	const [tweetsArr, setTweetsArr] = useState([])
	const [twtObjs, setTwtObjs] = useState([])
	const [noFolder, setNoFolder] = useState(false)
	const [deletingTweet, setDeletingTweet] = useState(null)
	const [eraseTweet, setEraseTweet] = useState(false)
	const [tweetCols, setTweetCols] = useState({ colA: [], colB: [] })
	const [isShared, setIsShared] = useState(folder.shared)
	const [shareUrl, setShareUrl] = useState('')

	useEffect(() => {
		setIsShared(folder.shared)
		if (folder.shared) {
			setShareUrl(SHARE_PREFIX + folder.url)
		}
	}, [folder.shared, folder])

	const toggleShare = () => {
		share(folder.folderId, !folder.shared)
	}

	const deleteTweet = (twtId) => {
		if (deletingTweet) {
			return
		}
		setDeletingTweet(twtId)
	}

    const copied = () => {
        toast('Copied URL!', { type: 'success' })
    }

	useEffect(() => {
		if (!deletingTweet) {
			return
		} else {
			;(async () => {
				const result = await remove(folder.folderId, deletingTweet, token)
				if (result.error) {
					toast('Failed to delete Tweet', { type: 'error' })
				} else {
					toast(result.message + folder.folderName, { type: 'success' })
				}
			})()
		}
		setEraseTweet(true)
	}, [deletingTweet])

	useEffect(() => {
		if (!eraseTweet) {
			return
		} else {
			const newObjs = [...twtObjs].map((obj) => {
				return obj.twtId === deletingTweet ? { ...obj, display: false } : obj
			})
			setTwtObjs(newObjs)
			setDeletingTweet(null)
			setEraseTweet(false)
		}
	}, [eraseTweet])

	useEffect(() => {
		if ((!folder || folder.folderId === null) && !loadedTweets) {
			setIsLoading(false)
			setNoFolder(true)
			return
		}
		setTwtObjs(twtObjs.map(obj => {
			return {...obj, display: false}
		}))
		if (loggedIn) {
            if (!loadedTweets) {
                setIsLoading(true)
                ;(async () => {
                    const tweets = await getOneFolder(folder.folderId, token)
                    if (tweets.error) {
                        toast(`Error: ${tweets.error}`)
                        localStorage.removeItem('state')
                        actions.forEach((action) =>
                            dispatch({ type: action, payload: null })
                        )
                        history.push('/')
                        setIsLoading(false)
                        return
                    }
                    if (tweets.tweets) {
                        setNoFolder(false)
                        setTweetsArr(tweets.tweets)
                        setIsLoading(false)
                    }
                })()
            } else {
                setTweetCols(loadedTweets)
                setIsLoading(false)
            }
			
		}
	}, [folder])

	useEffect(() => {
        if (loadedTweets) {
            return
        }
		if (tweetsArr.length === 0) {
			setTweetCols({ colA: [], colB: [] })
			return
		}
		setTwtObjs(
			tweetsArr.map((tweet) => ({
				twtId: tweet.twtId,
				tweet: tweet,
				display: true
			}))
		)
	}, [tweetsArr])

	useEffect(() => {
		if (!noFolder) {
			return
		}
		if (noFolder) {
			setTweetCols({ colA: [], colB: [] })
			setTweetsArr([])
			setTwtObjs([])
			return
		}
	}, [noFolder])

	useEffect(() => {
		if (twtObjs.length === 0) {
			return
		}
		const [colA, colB] = [[], []]
		twtObjs
			.filter((obj) => obj.display === true)
			.forEach((tweet, i) => {
				i % 2 === 0
					? colA.unshift(
							<div className='tweetcard mb-4'>
								<Tweet
									tweet={tweet.tweet}
									key={tweet.twtId}
									remove={deleteTweet}
									display={tweet.display}
									like={false}
                                    widget={window.bbtwt}
								/>
							</div>
					  )
					: colB.unshift(
							<div className='tweetcard mb-4'>
								<Tweet
									tweet={tweet.tweet}
									key={tweet.twtId}
									remove={deleteTweet}
									display={tweet.display}
									like={false}
                                    widget={window.bbtwt}
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
			<div className='center-spinner-one'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
	} else {
		return (
			<>
				{' '}
				{!noFolder ? (
					<Container className='folder-title'>
						<FaExpandAlt
							className='expand-folder'
							onClick={() => {
								viewLarge(tweetCols)
							}}
						/>
						<span className='folder-title-text'>{folder.folderName}</span>
						<div className='sharing share-container'>
							<div className='share-toggle' onClick={toggleShare}>
								<span className='share-label'>
									{isShared ? 'Unshare' : 'Share'}
								</span>
								{isShared ? (
									<BsToggleOn className='share-icon' />
								) : (
									<BsToggleOff className='share-icon' />
								)}
							</div>
							<CopyToClipboard onCopy={copied} text={shareUrl}>
								<MdContentCopy hidden={!isShared} className='copy-icon' />
							</CopyToClipboard>
						</div>
					</Container>
				) : null}
				<Container fluid scrollable={`true`} className='mt-4 mb-5 tweet-list'>
					{tweetsArr.length === 0 && !isLoading && !loadedTweets ? (
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
						<Row style={{ justifyContent: 'space-evenly' }}>
							<Col style={{ maxWidth: '45%' }} align='center'>
								{tweetCols.colA}
							</Col>
							<Col style={{ maxWidth: '45%' }} align='center'>
								{tweetCols.colB}
							</Col>
						</Row>
					)}
				</Container>
			</>
		)
	}
}

export default OneFolder