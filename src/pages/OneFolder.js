import React, { useContext, useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import { IoIosArrowBack } from 'react-icons/io'

import {
	Container,
	ListGroup,
	ListGroupItem,
	Spinner,
	Button,
    Row,
    Col
} from 'reactstrap'

import { SET_SINGLE_FOLDER, SET_SINGLE_FOLDER_NAME } from '../context/action.types'

import { AppContext } from '../context/Context'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { getOneFolder } from '../api/folders'

import Tweet from '../components/Tweet'

const OneFolder = ({folder}) => {
    const { state, dispatch } = useContext(AppContext)
    //const history = useHistory()
    const { loggedIn, token } = state

	const [ prevFolder, setPrevFolder ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const [ getTweets, setGetTweets ] = useState(true)
    const [ tweetsArr, setTweetsArr ] = useState([])

    const [ embed, setEmbed ] = useState(true)

	const [tweetRows, setTweetRows] = useState([])

    useEffect(() => {
		if (!folder) {
			return
		}
		console.log(`folder updated... getting ${folder.folderName}`)
        if (loggedIn) {
            (async () => {
				console.log(`getting folder:`)
				console.log(folder)
                const tweets = await getOneFolder(folder.folderId, token)
                if (tweets.error) {
                    toast(`Error: ${tweets.error}`)
                    setGetTweets(false)
                    setIsLoading(false)
                    return
                }
                if (tweets.tweets) {
                    setTweetsArr(tweets.tweets)
                    setGetTweets(false)
					setIsLoading(false)
					setPrevFolder(folder)
                }
            })()
        }
    }, [folder])

	useEffect(() => {
		if (tweetsArr.length === 0) {
			setTweetRows([])
			return
		}
		const [colA, colB] = [[], []]
		tweetsArr.forEach((tweet, i) => {
			i % 2 === 0
				? colA.push(
						<ListGroupItem key={tweet.twtId} className='tweetcard mb-4'>
							<Tweet tweet={tweet} embed={true} tweetKey={tweet.twtId}></Tweet>
						</ListGroupItem>
				  )
				: colB.push(
						<ListGroupItem key={tweet.twtId} className='tweetcard mb-4'>
							<Tweet tweet={tweet} embed={true} tweetKey={tweet.twtId}></Tweet>
						</ListGroupItem>
				  )
		})
		const rows = []
		for (let i = 0; i < colA.length; i++) {
			rows.push(
				<Row key={i}>
					<Col>{colA[i]}</Col>
					<Col>{colB[i] ? colB[i] : null}</Col>
				</Row>
			)
		}
		setTweetRows(rows)
	}, [tweetsArr])

	const toggleEmbed = () => {
		setEmbed(!embed)
	}

    if (!loggedIn) {
        return (
            <Redirect to='/auth'></Redirect>
        )
    } else if (isLoading) {
        return (
			<div className='Center'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
    } else {
        return (
					<>
						{' '}
						<Container className='folder-title'>
							<Row className='justify-content-md-center'>
								<Col md='auto'>
									<div className='folderName'>{folder.folderName}</div>
								</Col>
							</Row>
						</Container>
						<Container scrollable={`true`} className='mt-4 mb-5 tweet-list'>
							{tweetsArr.length === 0 && !isLoading ? (
								<div
									className='Center text-large cardtxt'
									style={{
										fontWeight: '700',
										fontSize: '32px',
										letterSpacing: '2px',
									}}>
									No Tweets (yet)!
								</div>
							) : (
								<ListGroup>
									<Container>{tweetRows}</Container>
								</ListGroup>
							)}
						</Container>
					</>
				)
        }
}


	/* <ListGroup>
									{tweetsArr.map((tweet) => (
										<ListGroupItem key={tweet.twtId} className='tweetcard mb-4'>
											<Tweet embed={embed} tweet={tweet} tweetKey={tweet.twtId} />
										</ListGroupItem>
									))}
								</ListGroup> */


export default OneFolder