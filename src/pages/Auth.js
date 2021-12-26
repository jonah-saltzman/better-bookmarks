import React, { useState, useContext, useEffect } from 'react'

import {
	Container,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Spinner,
	Row,
	Col,
} from 'reactstrap'

import { AppContext } from '../context/Context'

import {
	SET_USER,
	SET_TOKEN,
	SET_LOGIN,
	SET_USER_ID,
	SET_TWT_CHALLENGE,
} from '../context/action.types'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { authenticate } from '../api/auth'

const Auth = () => {
	// Get context and destructure loggedIn from state
	const { state, dispatch } = useContext(AppContext)
	const { loggedIn } = state

	// State for handling loading & triggering API calls
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	// State variable representing input fields
	const [signIn, setSignIn] = useState(true)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [twtId, setTwtId] = useState("")
	const [staySignedIn, setStaySignedIn] = useState(false)

	// Toggle betweein sign-in and register forms
	const toggleAuth = () => {
		setSignIn(!signIn)
	}

	// Handle form submission & validate input
	const handleSubmit = async (event) => {
		event.preventDefault()
		if (email === '' || password === '' || (!signIn && passwordConfirm === '')) {
			toast(`Please complete all required fields.`, { type: 'error' })
			return
		}
		if (!signIn && password !== passwordConfirm) {
			toast(`Passwords do not match!`, { type: 'error' })
			return
		}
		setIsLoading(true)
		setIsSubmitting(true)
	}

	// If the form event handler validates input, call the auth API
	useEffect(() => {
		if (!isSubmitting) {
			setIsLoading(false)
			return
		}
		(async () => {
			const authResult = await authenticate(
				email,
				password,
				twtId,
				!signIn
			)
			if (authResult.error) {
				toast(authResult.error, { type: 'error' })
			} else {
				toast(authResult.success, { type: 'success' })
				setCredentials(email, authResult)
			}
			setIsLoading(false)
			setIsSubmitting(false)
		})()
	}, [isSubmitting])

	// Set credential variables in parent state
	const setCredentials = (email, authResult) => {
		dispatch({
			type: SET_USER,
			payload: email,
		})
		dispatch({
			type: SET_TOKEN,
			payload: authResult.token,
		})
		dispatch({
			type: SET_USER_ID,
			payload: authResult.userId
		})
		dispatch({
			type: SET_TWT_CHALLENGE,
			payload: authResult.twtChallenge
		})
		dispatch({
			type: SET_LOGIN,
			payload: true,
		})
	}

	// Render spinner while waiting for API
	if (isLoading) {
		return (
			<div className='Center'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
	}

	// If logged in, redirect to /folders, else, render auth forms
	if (loggedIn) {
		return <Redirect to='/folders/view'></Redirect>
	} else {
		return (
			<Container fluid className='mt-5 '>
				<Row>
					<Col md='8' className='offset-md-2 p-3 '>
						<Form className='formcard auth-form' onSubmit={handleSubmit}>
							<FormGroup
								className='mt-4'>
								<input
									className='input'
									type='email'
									name='email'
									id='email'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<input
									className='input mt-2'
									type='password'
									name='password'
									id='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder='Password'
								/>
							</FormGroup>
							{signIn ? (
								<FormGroup check className='mt-2'>
									<Label check>
										<Input
											className='checkmark'
											type='checkbox'
											onChange={() => {
												setStaySignedIn(!staySignedIn)
											}}
											checked={staySignedIn}
										/>{' '}
										<span
											className='text-right'
											style={{
												color: '#f9f9f9',
												fontWeight: '400',
												letterSpacing: '1px',
											}}>
											Stay signed in
										</span>
									</Label>
								</FormGroup>
							) : (
								[
									<FormGroup key='password-confirm'>
										<input
											className='input mt-2'
											type='password'
											name='password-confirm'
											id='password-confirm'
											value={passwordConfirm}
											onChange={(e) => setPasswordConfirm(e.target.value)}
											placeholder='Confirm password'
										/>
									</FormGroup>,
									<FormGroup key='twtId'>
										<input
											className='input mt-2'
											type='text'
											name='twtId'
											id='twtId'
											value={twtId}
											onChange={(e) => setTwtId(e.target.value)}
											placeholder='Twitter Username'
										/>
									</FormGroup>,
								]
							)}
							<Button
								type='submit'
								color='primary'
								block
								className='text-uppercase button mt-5'
								style={{
									padding: '15px',
									fontSize: '18px',
								}}>
								{signIn ? 'Sign in' : 'Register'}
							</Button>
						</Form>
					</Col>
				</Row>
				<Row>
					<Col md='8' className='offset-md-8'>
						<Button
							onClick={toggleAuth}
							type='button'
							className='text-uppercase button-static'
							style={{
								padding: '15px',
								fontSize: '18px',
							}}>
							{signIn ? 'Register' : 'Sign in'}
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Auth