import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'

import { MdDelete, MdEdit } from 'react-icons/md'

import { TwitterTweetEmbed } from 'react-twitter-embed'

import { Tweet as EmbTweet } from 'react-twitter-widgets'

import { useHistory } from 'react-router-dom'

import { AppContext } from '../context/Context'

const Tweet = ({tweet, tweetKey, embed}) => {
	const { state, dispatch } = useContext(AppContext)
	const history = useHistory()

	const [isLoaded, setIsLoaded] = useState(false)
	const [showTweet, setShowTweet] = useState(false)

	const loaded = () => {
		setIsLoaded(true)
	}

	useEffect(() => {
		if (isLoaded) {
			return
		}
		setIsLoaded(true)
		setShowTweet(true)
	}, [isLoaded])

	const deleteTweet = () => {
		// Modal?
		return
	}

	return (
		<div hidden={!showTweet}>
			<Row hidden={!showTweet}>
				<Col
					md='10'
					className='d-flex justify-content-center align-items-center text-large cardtxt'
					style={{
						fontWeight: '700',
						fontSize: '32px',
						letterSpacing: '2px',
					}}>
					<div hidden={embed ? false : true} className='tweet'>
						<EmbTweet onLoad={() => {loaded()}} tweetId={tweet.twtId} />
					</div>
					<div hidden={embed ? true : false} className='tweet'>
						{tweet.twtText}
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
	)
}

export default Tweet
