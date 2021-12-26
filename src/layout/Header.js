//TODO: DONE set NavbarBrand to go to home page and export Header

import React, { useContext } from 'react'
import { Navbar, NavbarBrand, NavbarText, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Nav from 'reactstrap/lib/Nav'
import { AppContext } from '../context/Context'

import {
	SET_USER,
	SET_LOGIN,
	SET_TOKEN,
	SET_FOLDERS,
	SET_USER_ID,
} from '../context/action.types'


import { toast } from 'react-toastify'

import { logout } from '../api/auth'

const Header = () => {
	const { state, dispatch } = useContext(AppContext)
	const { loggedIn, token } = state

	const signout = async () => {
		if (!token) {
			toast('No user to logout!', { type: 'error' })
			return
		}
		const signoutResult = await logout(token)
		if (signoutResult.error) {
			toast(signoutResult.error, { type: 'error' })
			return
		}
		toast(signoutResult.success, { type: 'success' })
		const actions = [SET_USER, SET_LOGIN, SET_TOKEN, SET_FOLDERS, SET_USER_ID]
		actions.forEach((action) => dispatch({ type: action, payload: null }))
	}

	return (
		<Navbar sticky='top' className='nav'>
			<NavbarBrand tag={Link} to='/' className='text-white navbrand'>
				Better Bookmarks
			</NavbarBrand>
			<NavLink to='/folders/view' className='text-white'>
				Folders
			</NavLink>
			<NavLink to='/likes' className='text-white'>
				Likes
			</NavLink>
			<NavLink to='/folders/import' className='text-white'>
				Import
			</NavLink>
			<NavbarText className='text-white float-right navtxt'>
				{loggedIn ? (
					<span onClick={signout} className='text-white text-large link'>
						Logout
					</span>
				) : (
					<NavLink className='text-white text-large' to='/auth'>
						Login
					</NavLink>
				)}
			</NavbarText>
		</Navbar>
	)
}

export default Header
