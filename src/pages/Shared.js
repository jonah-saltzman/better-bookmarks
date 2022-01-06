import React, { useContext, useEffect, useState } from 'react'

import { Container, Spinner, Row, Col } from 'reactstrap'

import { toast } from 'react-toastify'

import { AppContext } from '../context/Context'

import { useHistory } from 'react-router-dom'

import { getSharedFolder } from '../api/folders'

import Tweet from '../components/Tweet'

const Shared = () => {
	const { state } = useContext(AppContext)
	const { sharedFolder } = state
    const history = useHistory()

	const [isLoading, setIsLoading] = useState(true)
	const [twtObjs, setTwtObjs] = useState([])
    const [components, setComponents] = useState([[], [], []])
    const [folder, setFolder] = useState(null)
    const [gotFolder, setGotFolder] = useState(false)
    const [loadingWidget, setLoadingWidget] = useState(true)

    useEffect(() => {
        console.log('bbtwt in shared')
        console.log(window.bbtwt)
        window.twttr.ready(() => {
            setLoadingWidget(false)
        })
    },[])

	useEffect(() => {
        if (!sharedFolder) {
            history.push('/')
            return
        }
        if (gotFolder) {
            return
        }
        (async () => {
            setIsLoading(true)
            const result = await getSharedFolder(sharedFolder)
            if (result.error) {
                toast(result.error, { type: 'error'})
                history.push('/')
                return
            }
            setFolder(result.folder)
            setGotFolder(true)
            setIsLoading(false)
        })()
    }, [gotFolder])

	useEffect(() => {
		if (folder?.tweets?.length === 0 || !folder) {
			return
		}
		setTwtObjs(
			folder.tweets.map((tweet) => ({
				twtId: tweet.twtId,
				tweet: tweet,
				like: false,
                share: true,
			}))
		)
	}, [folder])

	useEffect(() => {
		if (twtObjs.length === 0) {
			return
		}
        console.log(twtObjs.map(tweet => tweet.tweet.twtDate))
        const compArray = twtObjs
            .sort((twtA, twtB) => Date.parse(twtB.tweet.twtDate) - Date.parse(twtA.tweet.twtDate))
            .map((tweet) => (
					<div className='share-tweetcard'>
						<Tweet
							tweet={tweet.tweet}
							key={tweet.twtId}
							like={false}
							shared={true}
                            widget={window.twttr.init}
                            // or window.bbtwt
						/>
					</div>
				))
        const cols = [[], [], []]
        let i = 0
        for (const component of compArray) {
            cols[i].push(component)
            i = i === 2 ? 0 : i + 1
        }
        setComponents(cols)
    }, [twtObjs])

	if (isLoading || loadingWidget) {
		return (
			<div className='center-spinner'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
	} else {
        console.log('loading widget:')
        console.log(loadingWidget)
		return (
			<>
				<Container className='folder-title'>
					<Row className='justify-content-md-center'>
						<Col md='auto'>
							<div className='folderName'>{folder.folderName}</div>
						</Col>
					</Row>
				</Container>
				<Container
					fluid
					scrollable={`true`}
					className='mt-4 mb-5 share share-list'>
					<Row>
						<Col className='share-col-a' md={4}>
							{components[0]}
						</Col>
						<Col className='share-col-b' md={4}>
							{components[1]}
						</Col>
						<Col className='share-col-c' md={4}>
							{components[2]}
						</Col>
					</Row>
				</Container>
			</>
		)
        
	}
}

export default Shared
