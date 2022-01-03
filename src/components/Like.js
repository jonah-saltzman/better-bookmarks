import React, { useEffect, useState, createRef } from 'react'
import { Spinner } from 'reactstrap'
import { randomBytes } from 'crypto'

import { useInViewport } from 'react-in-viewport'

const Like = (props) => {
	const { tweet, add } = props

	const [enteredView, setEnteredView] = useState(false)
	const [loading, setLoading] = useState(false)

	const divRef = createRef()
	const config = { disconnectOnLeave: false }
	const { inViewport, enterCount } = useInViewport(divRef, config, props)

	const tweetDOMId = `twt-${tweet}` + randomBytes(8).toString('hex')
	const divDOMId = `div-${tweet}` + randomBytes(8).toString('hex')

	const onLoad = (event) => {
		if (event.target.children.length === 0) {
				return
			}
		if (event.target.children[0].dataset.tweetId === tweet) {
			setLoading(false)
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
			window.twttr.widgets
				.createTweet(tweet, document.getElementById(tweetDOMId), {
					theme: 'dark',
				})
			setLoading(true)
			return
		}
	}, [enteredView])

	return (
		<>
			<div className='center' hidden={!loading}>
				<Spinner color='primary' />
			</div>
			<div
				id={divDOMId}
				ref={divRef}
				className='add-tweet'
				onClick={() => add(tweet)}>
				<div id={tweetDOMId}></div>
			</div>
		</>
	)
}

export default Like