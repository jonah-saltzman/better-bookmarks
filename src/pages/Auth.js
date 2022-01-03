import React, { useState, useContext, useEffect } from 'react'

import { randomBytes } from 'crypto'

import {
	Container,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Spinner,
} from 'reactstrap'

import { AppContext } from '../context/Context'

import {
	SET_USER,
	SET_TOKEN,
	SET_LOGIN,
	SET_USER_ID,
	SET_TWT_CHALLENGE,
	SET_TWT_STATE,
	SET_OFFLINE,
	SET_SAVED_STATE
} from '../context/action.types'

import twitterButton from '../twitter_button.png'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { authenticate, twitterLogin, newTwtLogin } from '../api/auth'
import getTwtUrl from '../functions/newtwturl'

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
	const [staySignedIn, setStaySignedIn] = useState(false)

	const [clickedLogin, setClickedLogin] = useState(false)
	const [leftPage, setLeftPage] = useState(false)
	const [twtState, setTwtState] = useState(null)

	useEffect(() => {
		setTwtState(randomBytes(24).toString('hex'))
	}, [])

	const startTwitterAuth = async () => {
		const challenge = await newTwtLogin(twtState)
		if (!challenge || challenge.error) {
			toast('Error starting Twitter login', { type: 'error' })
			return
		}
		const dynamicURL = getTwtUrl(null, challenge.challenge, twtState, {
			offline: staySignedIn,
		})
		window.open(dynamicURL)
		setClickedLogin(true)
	}

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
				!signIn,
				twtState
			)
			if (authResult.error) {
				toast(authResult.error, { type: 'error' })
			} else {
				toast(authResult.success, { type: 'success' })
				setCredentials(email, authResult, false)
			}
			setIsLoading(false)
			setIsSubmitting(false)
		})()
	}, [isSubmitting])

	// Set credential variables in parent state
	const setCredentials = (email, authResult) => {
		dispatch({
			type: SET_USER,
			payload: {
				userName: email ? email : authResult.twtUser,
				displayName: email ? email : authResult.twtName,
				twt: authResult.twt
			},
		})
		dispatch({
			type: SET_TWT_STATE,
			payload: twtState,
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
		dispatch({
			type: SET_OFFLINE,
			payload: staySignedIn
		})
		dispatch({
			type: SET_SAVED_STATE,
			payload: false
		})
		localStorage.removeItem('token')
	}

	const checkForToken = async () => {
		const token = localStorage.getItem('token')
		setIsLoading(true)
		if (token) {
			(async () => {
				const authResult = await twitterLogin(token)
				if (authResult.error) {
					toast(authResult.error, { type: 'error' })
				} else {
					toast(authResult.success, { type: 'success' })
					setCredentials(null, authResult)
				}
				setIsLoading(false)
			})()
		} else {
			toast('Twitter login failed, try refreshing', { type: 'error' })
			setIsLoading(false)
		}
	}

	const onVisibilityChange = () => {
		if (document.visibilityState === 'visible') {
			if (leftPage && clickedLogin) {
				checkForToken()
				setLeftPage(false)
				setClickedLogin(false)
			}
		} else {
			setLeftPage(true)
		}
	}

	useEffect(() => {
		document.addEventListener('visibilitychange', onVisibilityChange)
		return () => {
			document.removeEventListener('visibilitychange', onVisibilityChange)
		}
	})

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
			<Container fluid className='flex mt-1'>
				<Form className='formcard flex-v auth-form' onSubmit={handleSubmit}>
					<img
						src={twitterButton}
						alt='Sign up or login with Twitter'
						onClick={startTwitterAuth}
						className='center-item twt-btn'></img>
					<FormGroup className='mt-4'>
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
					{signIn ? null : (
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
						</FormGroup>
					)}
					<FormGroup check className='mt-2 ml-3'>
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
					<Button
						color='primary'
						type='submit'
						block
						className='text-uppercase center-item mt-4'
						style={{
							padding: '5px',
							fontSize: '18px',
							width: '50%',
						}}>
						{signIn ? 'Sign in' : 'Register'}
					</Button>
					<Button
						onClick={(e) => {
							e.target.blur()
							toggleAuth()
						}}
						color='secondary'
						className='text-uppercase center-item mt-3'
						style={{
							padding: '5px',
							fontSize: '18px',
							width: '50%',
						}}>
						{signIn ? 'Register' : 'Sign in'}
					</Button>
				</Form>
			</Container>
		)
	}
}

export default Auth