import React, { useEffect, useState, createRef } from 'react'
import { Row, Col, Spinner, Container } from 'reactstrap'

import { MdDelete } from 'react-icons/md'

import { MdClose } from 'react-icons/md'

import { twtEmbedRE  } from '../constants'

import { useInViewport } from 'react-in-viewport'

const Tweet = (props) => {

	const { tweet, load, embed, remove, display } = props

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
	const divDOMId = `div-${tweet.twtId}`

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
			load(tweetDOMId)
			return
		}
	},[enteredView])

	useEffect(() => {
		if (!enteredView || !display) {
			return
		} else {
			load(tweetDOMId)
		}
	}, [display])

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
		return
	}

	return (
		<>
			<div ref={divRef} className='center' hidden={embed}>
				<Spinner color='primary' />
			</div>
			<MdDelete
				onClick={() => {
					remove(tweet.twtId)
				}}
				className={'delete-tweet ' + (embed ? '' : 'hidden')}
			/>
			<div id={divDOMId} ref={tweetRef} className='tweet-div'>
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
}

export default Tweet
