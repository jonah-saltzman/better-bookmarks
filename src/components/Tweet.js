import React, { useEffect, useState, createRef } from 'react'
import { Row, Col, Spinner, Container } from 'reactstrap'
import { randomBytes } from 'crypto'

import { MdDelete } from 'react-icons/md'

import { twtEmbedRE } from '../constants'

import { useInViewport } from 'react-in-viewport'

const Tweet = (props) => {
	const { tweet, load, embed, remove, display, like, add } = props

	const [enteredView, setEnteredView] = useState(false)
	const [twtUrl, setTwtUrl] = useState(tweet?.twtHtml?.match(twtEmbedRE)[0])

	const tweetRef = createRef()
	const divRef = createRef()
	const config = { disconnectOnLeave: false }
	const { inViewport, enterCount } = useInViewport(divRef, config, props)

	const tweetDOMId = `twt-${tweet.twtId}` + randomBytes(8).toString('hex')
	const divDOMId = `div-${tweet.twtId}` + randomBytes(8).toString('hex')

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
			console.log(`loading ${tweet.twtId} @ ${tweetDOMId}`)
			load(tweetDOMId, tweet.twtId)
			return
		}
	}, [enteredView])

	useEffect(() => {
		if (!enteredView || !display) {
			return
		} else {
			load(tweetDOMId)
		}
	}, [display])

	if (display) {
		console.log(`tweet ${tweet.twtId} url:`)
		console.log(twtUrl)
		console.log(tweet)
		return (
			<>
				<div ref={divRef} className='center' hidden={embed}>
					<Spinner color='primary' />
				</div>
				{like ? null : (
					<MdDelete
						onClick={() => {
							remove(tweet.twtId)
						}}
						className={'delete-tweet ' + (embed ? '' : 'hidden')}
					/>
				)}
				<div
					onClick={() => {
						if (like) {
							add(tweet.twtId)
						}
					}}
					id={divDOMId}
					ref={tweetRef}
					className='tweet-div like'>
					<blockquote
						id={tweetDOMId}
						className='twitter-tweet'
						data-conversation='none'
						data-dnt='true'
						data-theme='dark'>
						<a href={twtUrl}></a>
					</blockquote>
				</div>
			</>
		)
		} else {
			return null
		}
	}

export default Tweet