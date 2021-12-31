import React, { useEffect, useState, createRef } from 'react'
import { Row, Col, Spinner, Container } from 'reactstrap'
import { randomBytes } from 'crypto'

import { MdDelete } from 'react-icons/md'

import { twtEmbedRE } from '../constants'

import { useInViewport } from 'react-in-viewport'

const Tweet = (props) => {
	const { tweet, add } = props

	const [enteredView, setEnteredView] = useState(false)

	const divRef = createRef()
	const config = { disconnectOnLeave: false }
	const { inViewport, enterCount } = useInViewport(divRef, config, props)

	const tweetDOMId = `twt-${tweet}` + randomBytes(8).toString('hex')
	const divDOMId = `div-${tweet}` + randomBytes(8).toString('hex')

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
			window.twttr.widgets
				.createTweet(tweet, document.getElementById(tweetDOMId), {
					theme: 'dark',
				})
			return
		}
	}, [enteredView])

	return (
		<div
			id={divDOMId}
            ref={divRef}
            className='add-tweet'
			onClick={() => add(tweet)}>
                <div id={tweetDOMId}></div>
            </div>
	)
}

export default Tweet