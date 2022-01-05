import React, { useEffect, useState, createRef } from 'react'
import { randomBytes } from 'crypto'

import { MdDelete, MdHistory } from 'react-icons/md'

import { useInViewport } from 'react-in-viewport'

import { tweetJsx } from '../functions/generateHtml'

const Tweet = (props) => {
	const { tweet, remove, display, shared } = props
	const [enteredView, setEnteredView] = useState(false)
	const [loaded, setLoaded] = useState(false)
    const [deleted, setDeleted] = useState(null)

	const divRef = createRef()
	const config = { disconnectOnLeave: false }
	const { inViewport, enterCount } = useInViewport(divRef, config, props)

	const tweetDOMId = `twt-${tweet.twtId}` + randomBytes(8).toString('hex')
	const divDOMId = `div-${tweet.twtId}` + randomBytes(8).toString('hex')

    const done = (result) => {
        if (result) {
            setLoaded(true)
            setDeleted(false)
        } else {
            setDeleted(true)
        }
    }

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
			).then(done)
			return
		}
	}, [enteredView])

	const manualToggle = () => {
		const embed = document.getElementById(tweetDOMId)
		const archive = document.getElementById(tweetDOMId + 'TXT')
		embed.toggleAttribute('hidden')
		archive.toggleAttribute('hidden')
	}

	if (display || shared) {
		return (
			<>
				<div ref={divRef}>
					<MdHistory
						hidden={deleted}
						onClick={manualToggle}
						className='show-text'
					/>
					<MdDelete
						hidden={shared}
						onClick={() => {
							remove(tweet.twtId)
						}}
						className={'delete-tweet '}
                        style={{zIndex: '15'}}
					/>
					<div id={divDOMId} className='add-tweet'>
						<span hidden={!deleted} className='deleted-tweet'>
							Private/Deleted
						</span>
						<div id={tweetDOMId}></div>
						<div id={tweetDOMId + 'TXT'} hidden={loaded}>
							{tweetJsx(tweet)}
						</div>
					</div>
				</div>
			</>
		)
		} else {
			return null
		}
	}

export default Tweet