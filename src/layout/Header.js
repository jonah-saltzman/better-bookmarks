//TODO: DONE set NavbarBrand to go to home page and export Header

import React, { useContext, useState } from 'react'

import { Navbar, NavbarBrand, NavbarText, ModalHeader, } from 'reactstrap'
import {
	Container,
	Modal,
	ModalBody,
	ModalTitle,
	ModalFooter,
	Form,
	Button
} from 'react-bootstrap'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { AppContext } from '../context/Context'

import {
	SET_USER,
	SET_LOGIN,
	SET_TOKEN,
	SET_FOLDERS,
	SET_USER_ID,
	SET_TWT_CHALLENGE,
	SET_TWT_AUTH,
	SET_TWT_STATE,
	SET_OFFLINE,
	SET_SAVED_STATE,
} from '../context/action.types'


import { toast } from 'react-toastify'

import { logout, changePassword } from '../api/auth'

const Header = () => {
	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, token, user } = state
	const [showAccount, setShowAccount] = useState(false)
	const [oldPass, setOldPass] = useState('')
	const [newPass, setNewPass] = useState('')
	const [newPassConf, setNewPassConf] = useState('')
	const [showChangePass, setShowChangePass] = useState(false)
	const history = useHistory()

	const signout = async () => {
		if (!token) {
			toast('No user to logout!', { type: 'error' })
			localStorage.removeItem('state')
			history.push('/')
			return
		}
		const signoutResult = await logout(token)
		if (signoutResult.error) {
			toast(signoutResult.error, { type: 'error' })
			localStorage.removeItem('state')
			history.push('/')
			return
		}
		toast(signoutResult.success, { type: 'success' })
		const actions = [
			SET_USER,
			SET_LOGIN,
			SET_TOKEN,
			SET_FOLDERS,
			SET_USER_ID,
			SET_TWT_AUTH,
			SET_TWT_CHALLENGE,
			SET_TWT_STATE,
			SET_OFFLINE,
		]
		actions.forEach((action) => dispatch({ type: action, payload: null }))
		localStorage.removeItem('state')
		history.push('/')
	}

	const closeAccModal = () => {
		setShowAccount(false)
	}

	const showAccModal = () => {
		setShowAccount(true)
	}

	const toggleChangePass = () => {
		setShowChangePass(!showChangePass)
	}

	const startSignOut = () => {
		signout()
		setShowAccount(false)
	}

	const handleChangePass = async (e) => {
		e.preventDefault()
		if (newPass !== newPassConf) {
			toast(`New passwords don't match!`, {type: 'error'})
			setNewPass('')
			setNewPassConf('')
			return
		}
		const result = await changePassword(token, oldPass, newPass)
		console.log(result)
		if (!result) {
			toast('Unknown error', { type: 'error' })
		} else {
			toast(result.message, { type: result.error ? 'error' : 'success' })
			setNewPass('')
			setNewPassConf('')
			setShowChangePass(false)
		}
	}

	const changePassForm = (
		<Container className='flex'>
			<Form onSubmit={handleChangePass} className='flex-v pass-form'>
				<input
					className='input mb-3'
					type='password'
					name='oldPass'
					id='oldPass'
					value={oldPass}
					onChange={(e) => setOldPass(e.target.value)}
					placeholder='Current password'
				/>
				<input
					className='input mb-3'
					type='password'
					name='newwPass'
					id='newPass'
					value={newPass}
					onChange={(e) => setNewPass(e.target.value)}
					placeholder='New password'
				/>
				<input
					className='input mb-3'
					type='password'
					name='newPassConf'
					id='newPassConf'
					value={newPassConf}
					onChange={(e) => setNewPassConf(e.target.value)}
					placeholder='Confirm new password'
				/>
				<div className='center-item'>
					<Button onClick={toggleChangePass} className='btn-secondary mb-3'>
						Cancel
					</Button>
					<Button className='ml-3 mb-3' color='primary' type='submit'>
						Change Password
					</Button>
				</div>
			</Form>
		</Container>
	)

	const accountModal = (
		<Modal show={showAccount}>
			<ModalHeader className='account-title'>
				<ModalTitle className='text-large'>{`${user?.displayName}`}</ModalTitle>
			</ModalHeader>
			<ModalBody>
				{showChangePass ? changePassForm : null}
				<div className='flex'>
					<div className='center-item'>
						{!user?.twt ? (
							showChangePass ? null : (
								<Button color='primary' onClick={toggleChangePass}>
									Change Password
								</Button>
							)
						) : null}
						{!showChangePass ? (<Button
							onClick={startSignOut}
							className={'btn-warning' + (!user?.twt ? ' ml-3' : '')}>
							Logout
						</Button>) : null}
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={closeAccModal}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	)

	return (
		<Navbar sticky='top' className='nav'>
			<NavbarBrand tag={Link} to='/' className='text-white navbrand'>
				Better Bookmarks
			</NavbarBrand>
			<NavLink to='/folders/view' className='text-white'>
				Folders
			</NavLink>
			<NavLink to='/folders/likes' className='text-white'>
				Likes
			</NavLink>
			<NavLink to='/folders/import' className='text-white'>
				Import
			</NavLink>
			<NavbarText className='text-white float-right navtxt'>
				{loggedIn ? (
					<span onClick={showAccModal} className='text-white text-large link'>
						Account
					</span>
				) : (
					<NavLink className='text-white text-large' to='/auth'>
						Login
					</NavLink>
				)}
			</NavbarText>
			{accountModal}
		</Navbar>
	)
}

export default Header
