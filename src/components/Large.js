import React, { useEffect, useState } from 'react'

import { Container, Spinner, Row, Col } from 'react-bootstrap'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import { getSharedFolder } from '../api/folders'

import { MdArrowBack } from 'react-icons/md'

import Tweet from '../components/Tweet'

const Large = (props) => {
	const { sharedFolder, oneFolder, back, name } = props
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)
	const [twtObjs, setTwtObjs] = useState([])
	const [components, setComponents] = useState([[], [], []])
	const [folder, setFolder] = useState(null)
	const [gotFolder, setGotFolder] = useState(false)
	const [loadingWidget, setLoadingWidget] = useState(true)
	const [type, setType] = useState('')

	useEffect(() => {
		window.twttr.ready(() => {
			setLoadingWidget(false)
		})
	}, [])

	useEffect(() => {
		if (!sharedFolder && !oneFolder) {
			navigate('/')
			return
		}
		if (gotFolder) {
			return
		}
        if (sharedFolder) {
            setIsLoading(true)
            ;(async () => {
                setIsLoading(true)
                const result = await getSharedFolder(sharedFolder)
                if (result.error) {
                    toast(result.error, { type: 'error' })
                    navigate('/')
                    return
                }
                setType('SHARED')
                setFolder(result.folder)
                setGotFolder(true)
                setIsLoading(false)
            })()
        } else {
            setType('BIG')
            const tweetsArr = [...oneFolder.colA, ...oneFolder.colB]
            const cols = [[], [], []]
            let i = 0
            for (const component of tweetsArr) {
                cols[i].push(component)
                i = i === 2 ? 0 : i + 1
            }
            setComponents(cols)
        }
	}, [gotFolder])

	useEffect(() => {
		if (folder?.tweets?.length === 0 || !folder) {
			return
		}
        if (type === 'SHARED') {
            setTwtObjs(
							folder.tweets.map((tweet) => ({
								twtId: tweet.twtId,
								tweet: tweet,
								like: false,
								share: type === 'SHARED',
							}))
						)
        }
	}, [folder])

	useEffect(() => {
		if (twtObjs.length === 0) {
			return
		}
		const compArray = twtObjs
			.sort(
				(twtA, twtB) =>
					Date.parse(twtB.tweet.twtDate) - Date.parse(twtA.tweet.twtDate)
			)
			.map((tweet, i) => (
				<div className='share-tweetcard'>
					<Tweet
						tweet={tweet.tweet}
						key={tweet.twtId + 'large'}
						like={false}
						shared={tweet.share}
						widget={window.twttr.init}
						id={tweet.twtId + i}
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
		return (
			<>
				<Container style={{maxWidth: '95%'}} fluid className='folder-title'>
					<div style={{alignSelf: 'center'}}>
						<MdArrowBack
							hidden={type === 'SHARED'}
							onClick={back}
							className='expand-folder'
						/>
					</div>
					<span className='folder-title-text'>
						{type === 'SHARED' ? folder.folderName : name}
					</span>
					<div></div>
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

export default Large
