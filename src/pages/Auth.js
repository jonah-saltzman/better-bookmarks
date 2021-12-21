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
	SET_EMAIL,
	SET_IN_AUTH,
	TOGGLE_AUTH,
	SET_TOKEN,
	SET_LOGIN,
	RESET_SIGNIN,
	SET_LOADING
} from '../context/action.types'

import { toast } from 'react-toastify'

import { Redirect } from 'react-router-dom'

import { login, signup } from '../api/auth'

const Auth = () => {
    const { state, dispatch } = useContext(AppContext)

    const { signIn, inAuth, loggedIn, isLoading } = state

	const [isSubmitting, setIsSubmitting] = useState(false)

    const toggleAuth = () => {
        dispatch({
            type: TOGGLE_AUTH,
            payload: !signIn
        })
    }

    useEffect(() => {
        if (!inAuth) {
					dispatch({
						type: SET_IN_AUTH,
						payload: true,
					})
				}
    }, [])

	useEffect(() => {
		if (!isSubmitting) {
			return
		}
		if (signIn) {
			dispatch({
				type: SET_LOADING,
				payload: true,
			})
			login(email, password, (err, token) => {
				if (err) {
					toast(`${err}`, { type: 'error' })
				}
				if (token) {
					toast(`${email} logged in!`, { type: 'success' })
					dispatch({
						type: SET_EMAIL,
						payload: email,
					})
					dispatch({
						type: SET_TOKEN,
						payload: token,
					})
					dispatch({
						type: SET_LOGIN,
						payload: true,
					})
				}
				dispatch({
					type: SET_LOADING,
					payload: false,
				})
				setIsSubmitting(false)
			})
		} else {
			dispatch({
				type: SET_LOADING,
				payload: true,
			})
			signup(email, password, passwordConfirm, twtId, (err, user) => {
				if (err) {
					toast(`${err}`, { type: 'error' })
				} else if (user) {
					login(email, password, (err, token) => {
						if (err) {
							toast(`Account created but sign-in failed. Try again.`, {
								type: 'error',
							})
						}
						if (token) {
							toast(`Account created! Signed in as ${email}.`, {
								type: 'success',
							})
							dispatch({
								type: SET_EMAIL,
								payload: email,
							})
							dispatch({
								type: SET_TOKEN,
								payload: token,
							})
							dispatch({
								type: SET_LOGIN,
								payload: true,
							})
						}
						dispatch({
							type: SET_LOADING,
							payload: false,
						})
						setIsSubmitting(false)
					})
				} else {
					dispatch({
						type: SET_LOADING,
						payload: false,
					})
					toast(`Unknown error.`, { type: 'error' })
					setIsSubmitting(false)
				}
			})
		}
	})

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [twtId, setTwtId] = useState("")
    const [staySignedIn, setStaySignedIn] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
		if (email == "" || password == "" || (!signIn && passwordConfirm == "")) {
			toast(`Please complete all required fields.`, { type: 'error' })
			return
		}
		isSubmitting(true)
    }
	if (isLoading) {
		return (
			<div className='Center'>
				<Spinner color='primary' />
				<div className='text-primary'>Loading...</div>
			</div>
		)
	}
	if (loggedIn) {
		dispatch({
			type: SET_IN_AUTH,
			payload: false,
		})
		dispatch({
			type: RESET_SIGNIN
		})
		return (
			<Redirect to='/folders'></Redirect>
		)
	} else {
		return (
			<Container fluid className='mt-5 '>
				<Row>
					<Col md='8' className='offset-md-2 p-3 '>
						<Form className='formcard mb-5' onSubmit={handleSubmit}>
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
							style={{
								padding: '15px',
								fontSize: '18px',
							}}
							className='text-uppercase button-secondary'>
							{signIn ? 'Register' : 'Sign in'}
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
    
}

export default Auth