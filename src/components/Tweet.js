import React, { useEffect, useState, createRef } from 'react'
import { Row, Col, Spinner, Container } from 'reactstrap'
import { randomBytes } from 'crypto'

import { MdDelete, MdHistory } from 'react-icons/md'

import { twtEmbedRE } from '../constants'

import { useInViewport } from 'react-in-viewport'

const Tweet = (props) => {
	const { tweet, remove, display, shared } = props

	const [enteredView, setEnteredView] = useState(false)
	const [twtUrl, setTwtUrl] = useState(tweet?.twtHtml?.match(twtEmbedRE)[0])
	const [loading, setLoading] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [showText, setShowText] = useState(true)
	const [twtHtml, setTwtHtml] = useState({__html: tweet.twtHtml})

	const tweetRef = createRef()
	const divRef = createRef()
	const config = { disconnectOnLeave: false }
	const { inViewport, enterCount } = useInViewport(divRef, config, props)

	const tweetDOMId = `twt-${tweet.twtId}` + randomBytes(8).toString('hex')
	const divDOMId = `div-${tweet.twtId}` + randomBytes(8).toString('hex')

	const onLoad = (event) => {
		if (event.target.children.length === 0) {
			return
		}
		if (event.target.children[0].dataset.tweetId === tweet.twtId) {
			setLoaded(true)
			setLoading(false)
			toggleEmbed()
		}
	}

	useEffect(() => {
		window.twttr.events.bind('rendered', onLoad)
		return () => {
			window.twttr.events.unbind('rendered', onLoad)
		}
	}, [])

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
			window.twttr.widgets.createTweet(
				tweet.twtId,
				document.getElementById(tweetDOMId),
				{
					theme: 'dark',
				}
			)
			setLoading(true)
			return
		}
	}, [enteredView])

	const toggleEmbed = () => {
		setShowText(!showText)
	}

	if (display || shared) {
		return (
			<>
				<div className='center' hidden={loaded || showText}>
					<Spinner color='primary' />
				</div>
				<MdHistory onClick={toggleEmbed} className='show-text'/>
				<MdDelete
					hidden={!loaded || shared}
					onClick={() => {
						remove(tweet.twtId)
					}}
					className={'delete-tweet '}
				/>
				<div
					id={divDOMId}
					ref={divRef}
					className='add-tweet'>
					<div id={tweetDOMId}></div>
					<div dangerouslySetInnerHTML={twtHtml} hidden={!showText} id={tweetDOMId + 'TXT'}></div>
				</div>
			</>
		)
		} else {
			return null
		}
	}

export default Tweet