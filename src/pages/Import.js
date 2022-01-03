import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Context'
import { FormGroup, Form, Container, Button, Spinner } from 'reactstrap'
import { toast } from 'react-toastify'
import { bookmarkTweets } from '../api/tweets'
import { NavLink } from 'react-router-dom'
import { Modal, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

import { twtREOne, twtRETwo } from '../constants'
import getImportResults from '../functions/getImportResults'

import ImportField from '../components/ImportField'


const Import = ({folder}) => {

    const getInitialFields = () => {
			return [0, 1, 2, 3, 4].map((n) => ({ number: n, value: '', valid: null }))
		}
    
    const { state } = useContext(AppContext)
    const { token } = state
    const [ callingApi, setCallingApi ] = useState(false)
    const [ inputObjs, setInputObjs ] = useState([])
    const [ showResult, setShowResult ] = useState(false)
    const [ resultInfo, setResultInfo ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)

    const validateInputs = () => {
        setInputObjs(inputObjs.map(input => {
            return input.value.length === 0
                ? {...input, valid: null}
                : (twtREOne.test(input.value) || twtRETwo.test(input.value))
                ? {...input, valid: 'valid'}
                : {...input, valid: 'invalid'}
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateInputs()
        if (inputObjs.some(input => input.valid === 'invalid')) {
            toast('Some inputs are invalid!', { type: 'error' })
            return
        } else {
            setCallingApi(true)
        }
    }

    useEffect(() => {
        if (!callingApi) {
            return
        }
        setIsLoading(true)
        setCallingApi(false)
        const tweets = inputObjs.reduce((array, input, i) => {
					if (input.value.length > 0 && input.valid === 'valid') {
						array.push(input.value)
					}
					return array
				}, []);
        (async () => {
            const result = await bookmarkTweets(folder.folderId, tweets, token)
            setResultInfo(getImportResults(result, folder.folderName))
            setIsLoading(false)
            setShowResult(true)
        })()
    }, [callingApi])

    useEffect(() => {
        if (Object.keys(resultInfo).length === 0) {
            return
        }
        if (resultInfo.remaining?.length > 0) {
            setInputObjs(
							resultInfo.remaining.map((id, i) => ({
								number: i,
								value: id,
								valid: 'valid',
							}))
						)
        } else {
            setInputObjs(getInitialFields())
        }
    }, [resultInfo])

    useEffect(() => {
        if (inputObjs.length === 0) {
            setInputObjs(getInitialFields())
            return
        }
        const lastObj = inputObjs[inputObjs.length - 1]
        if (lastObj.value.length > 0) {
            const newObj = {
                number: lastObj.number + 1,
                value: "",
                valid: null
            }
            setInputObjs([...inputObjs, newObj])
        }
    }, [inputObjs])

    const updateValue = (inputNumber, value) => {
        setInputObjs(inputObjs.map(input => {
            return input.number === inputNumber
                ? {...input, value: value}
                : input
        }))
    }

    const handleClose = () => {
        setResultInfo({})
        if (!showResult) {
            return
        }
        setShowResult(false)
    }

    const twtLink = <NavLink to='/twitter' className='text-white'>Login with Twitter</NavLink>

    const resultModal = (
			<Modal show={showResult} backdrop='static' keyboard={false}>
				<ModalHeader>
					<ModalTitle>{resultInfo.header}</ModalTitle>
				</ModalHeader>
				{resultInfo.showBody ? (
					<ModalBody>
						{resultInfo.body}
						{resultInfo.link ? twtLink : null}
					</ModalBody>
				) : null}
				<ModalFooter>
					<Button color='primary' onClick={handleClose}>
						Done
					</Button>
				</ModalFooter>
			</Modal>
		)
   return (
			<>
				<div hidden={!isLoading} className='Center'>
					<Spinner color='primary' />
					<div className='text-primary'>Loading...</div>
				</div>
				<div hidden={isLoading}>
					<Container className='input-list'>
						<Form onSubmit={handleSubmit} className={'mt-4 text-center'}>
							<FormGroup>
								{inputObjs.map((input) => (
									<ImportField
										key={input.number}
										setValue={updateValue}
										fieldNumber={input.number}
										valid={input.valid}
										validate={validateInputs}
                                        value={input.value}
									/>
								))}
							</FormGroup>
							<Button color='primary' type='submit'>
								Import Tweets
							</Button>
						</Form>
					</Container>
				</div>
				{resultModal}
			</>
		)
}

export default Import