import React, { useEffect, useState, createRef, useContext } from 'react'
import { Spinner } from 'react-bootstrap'

import { AppContext } from '../context/Context'
import { getDeleted } from '../api/tweets'
import tweetJsx from '../functions/tweetJsx'

import { useInViewport } from 'react-in-viewport'

const Like = (props) => {
	const { tweet, add, folder, id } = props
	const { state } = useContext(AppContext)
	const { twtState, token } = state

	const [enteredView, setEnteredView] = useState(false)
	const [loading, setLoading] = useState(false)
	const [hover, setHover] = useState(false)
	const [deleted, setDeleted] = useState(null)
	const [savedJsx, setSavedJsx] = useState(null)
	const [tweetDOMId, setTweetDOMId] = useState(`twt-${tweet}` + id)
	const [divDOMId, setDivDOMId] = useState(`div-${tweet}` + id)

	const divRef = createRef()
	const config = { disconnectOnLeave: false }
	const { inViewport, enterCount } = useInViewport(divRef, config, props)

    useEffect(() => {
        if (!deleted) {
            return
        }
        ;(async () => {
            if (deleted === true && loading) {
                const newTweet = await getDeleted(tweet, twtState, token)
                if (newTweet) {
                    setSavedJsx(tweetJsx(newTweet.tweet))
                    setLoading(false)
                }
            }
        })()
    }, [deleted])

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
            setLoading(true)
			window.twttr.widgets
				.createTweet(tweet, document.getElementById(tweetDOMId), {
					theme: 'dark',
				}).then(done)
			return
		}
	}, [enteredView])

    const done = (result) => {
        if (result) {
            setLoading(false)
            setDeleted(false)
        } else {
            setDeleted(true)
        }
    }

    if (deleted === true && !loading) {
        return (
					<>
						<div
							id={divDOMId}
							ref={divRef}
							onMouseEnter={() => setHover(true)}
							onMouseLeave={() => setHover(false)}
							className='add-tweet'
							onClick={() => add(tweet)}>
							<span hidden={!hover || loading} className='link deleted-tweet'>
								Private/Deleted
							</span>
							<div id={tweetDOMId}>{savedJsx}</div>
						</div>
					</>
				)
    } else {
        return (
					<>
						<div className='center' hidden={!loading}>
							<Spinner color='primary' />
						</div>
						<div
							id={divDOMId}
							ref={divRef}
							onMouseEnter={() => setHover(true)}
							onMouseLeave={() => setHover(false)}
							className='add-tweet'
							onClick={() => add(tweet)}>
							<span hidden={!hover || loading} className='link add-tweet-text'>
								Add to {folder}
							</span>
							<div className='no-click' id={tweetDOMId}></div>
						</div>
					</>
				)
    }
}

export default Like