import React, { useContext, useEffect, useState, useRef, createRef } from 'react'
import { Row, Col, Spinner } from 'reactstrap'

import { MdDelete, MdEdit } from 'react-icons/md'

import { TwitterTweetEmbed } from 'react-twitter-embed'

import { Tweet as EmbTweet } from 'react-twitter-widgets'

import { useHistory } from 'react-router-dom'

import { twtEmbedRE, twtEmbedPrefix, twtEmbedSuffix } from '../constants'

import { AppContext } from '../context/Context'
import { useInViewport } from 'react-in-viewport'

const Tweet = (props) => {
	const { state, dispatch } = useContext(AppContext)

	const { tweet, load, embed } = props

	const [enteredView, setEnteredView] = useState(false)
	const [ twtUrl, setTwtUrl ] = useState(tweet.twtHtml.match(twtEmbedRE)[0])

	const tweetRef = createRef()
	const divRef = createRef()
	const config = { disconnectOnLeave: false}
	const { inViewport, enterCount } = useInViewport(
		divRef,
		config,
		props
	)

	const tweetDOMId = `twt-${tweet.twtId}`

	// console.log(`rendering tweet: ${tweet.twtId}, embed=${embed}`)
	// console.log(`twt-${tweet.twtId} REF: `)
	// console.log(tweetRef)

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
			console.log('div entered view:')
			console.log(divRef)
			load(tweet.twtId, true, tweetDOMId)
			return
		}
	},[enteredView])

	// useEffect(() => {
	// 	if (Object.keys(compHtml).length !== 0) {
	// 		return
	// 	}
	// 	const url = tweet.twtHtml.match(twtEmbedRE)[0]
	// 	// const html =
	// 	// 	twtEmbedPrefix.slice(0, 12) +
	// 	// 	`id="${tweetDOMId}" ` +
	// 	// 	twtEmbedPrefix.slice(12) +
	// 	// 	url +
	// 	// 	twtEmbedSuffix
	// 	// console.log(html)
	// 	// setCompHtml({ __html: html })
	// }, [compHtml])

	// const loaded = () => {
	// 	setIsLoading(false)
	// }

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
		<div id={`div-${tweet.twtId}`} ref={divRef}>
			<div className='center' hidden={embed}>
				<Spinner color='primary' />
			</div>
			<div >
				<Row>
					<Col md='10'>
						<div ref={tweetRef}>
								<blockquote id={tweetDOMId} className="twitter-tweet" data-dnt="true" data-theme="dark"><a href={twtUrl}></a></blockquote>
							</div>
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
		</div>
	)
}

export default Tweet
