import React from "react"
import {Container, Row, Col} from "react-bootstrap"
import he from 'he'

import { urlRE, IMG_URL_PREFIX, AWS_URL } from "../constants"

const tweetJsx = (tweet) => {
    const date = new Date(Date.parse(tweet.twtDate)).toLocaleDateString(
			undefined,
			{
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			}
		)
    const images = tweet.twtMedia.length > 0 ? tweet.twtMedia.map((media) => (
			<img src={IMG_URL_PREFIX + media.key} className='gallery-image img-thumbnail img-fluid' />
		)) : []
    let table;
    if (images.length === 1) {
        table = <Row><Col>{images[0]}</Col></Row>
    } else if (images.length === 2) {
        table = <Row><Col>{images[0]}</Col><Col>{images[1]}</Col></Row>
    } else if (images.length === 3) {
        table = (
					<Row>
						<Col>{images[0]}</Col>
						<Col>
							<Row>
								<Col>{images[1]}</Col>
							</Row>
							<Row>
								<Col>{images[2]}</Col>
							</Row>
						</Col>
					</Row>
				)
    } else if (images.length === 4) {
        table = (
					<>
						<Row>
							<Col>{images[0]}</Col>
							<Col>{images[1]}</Col>
						</Row>
						<Row>
							<Col>{images[2]}</Col>
							<Col>{images[3]}</Col>
						</Row>
					</>
				)
    } else {
        table = null
    }
    const gallery = table ? <Container className='tweet-gallery'>{table}</Container> : null
    return (
			<blockquote key={tweet.twtId + 'block'} className='twitter-tweet-jsx'>
				<p lang='en' dir='ltr'>
					{he.decode(tweet.twtText.replace(urlRE, ''))}
				</p>
				{gallery}
				{`— ${tweet.twtAuthor.name} (@${tweet.twtAuthor.username}) `}
				<a
					href={`https://twitter.com/${tweet.twtAuthor.username}/status/${tweet.twtId}`}>
					{date}
				</a>
			</blockquote>
		)
}

export default tweetJsx