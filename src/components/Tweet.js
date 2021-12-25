import React, { useContext, useEffect, useState, useRef } from 'react'
import { Row, Col, Spinner } from 'reactstrap'

import { MdDelete, MdEdit } from 'react-icons/md'

import { TwitterTweetEmbed } from 'react-twitter-embed'

import { Tweet as EmbTweet } from 'react-twitter-widgets'

import { useHistory } from 'react-router-dom'

import { AppContext } from '../context/Context'
import { useInViewport } from 'react-in-viewport'

const Tweet = (props) => {
	const { state, dispatch } = useContext(AppContext)
	const history = useHistory()

	const { tweet } = props

	const [enteredView, setEnteredView] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoaded, setisLoaded] = useState(false)

	const tweetRef = useRef()
	const config = { disconnectOnLeave: false}
	const { inViewport, enterCount } = useInViewport(
		tweetRef,
		config,
		props
	)

	useEffect(() => {
		if (enteredView || enterCount > 1 || !inViewport) {
			return
		}
		if (inViewport) {
			setEnteredView(true)
			return
		}
	}, [inViewport])

	useEffect(() => {
		if (!enteredView) {
			return
		}
		if (enteredView) {
			setIsLoading(true)
			return
		}
	},[enteredView])



	const loaded = () => {
		setIsLoading(false)
	}

	// useEffect(() => {
	// 	if (isLoaded) {
	// 		return
	// 	}
	// 	setIsLoaded(true)
	// 	setShowTweet(true)
	// }, [isLoaded])

	const deleteTweet = () => {
		// Modal?
		return
	}

	return (
		<div ref={tweetRef}>
			<Row>
				<Col
					md='10'
					className='d-flex justify-content-center align-items-center text-large cardtxt'
					style={{
						fontWeight: '700',
						fontSize: '32px',
						letterSpacing: '2px',
					}}>
					{enteredView ? (
						<><div className='tweet'>
							<EmbTweet onLoad={() => {
								loaded()
								}} tweetId={tweet.twtId} />
						</div><div hidden={!isLoading} className='tweet'>
								<Spinner color='primary' />
							</div></>
					) : (
						<div className='tweet'>{tweet.twtText}</div>
					)}
				</Col>
				<Col
					md='2'
					className='d-flex justify-content-center align-items-center'>
					<div className='iconbtn'>
						<MdDelete
							onClick={() => deleteTweet()}
							color='#FF6370'
							className=' icon'
							style={{ zIndex: '1' }}
						/>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Tweet
