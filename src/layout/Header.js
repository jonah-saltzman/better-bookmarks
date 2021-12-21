//TODO: DONE set NavbarBrand to go to home page and export Header

import React, { useContext } from 'react'
import { Navbar, NavbarBrand, NavbarText, Button } from "reactstrap";
import { NavLink } from 'react-router-dom'
import { Link } from "react-router-dom";
import Nav from "reactstrap/lib/Nav";
import { AppContext } from '../context/Context'
import { login } from '../api/auth';
import { Signout } from '../components/Signout'

const Header = () => {
  const { state, dispatch } = useContext(AppContext)
  const { inAuth, signIn, loggedIn } = state
  return (
		<Navbar className='nav'>
			<NavbarBrand tag={Link} to='/' className='text-white navbrand'>
				Better Bookmarks
			</NavbarBrand>
			<NavLink to='/folders' className='text-white'>
				Folders
			</NavLink>
			<NavLink to='/likes' className='text-white'>
				Likes
			</NavLink>
			<NavLink to='/import' className='text-white'>
				Import
			</NavLink>
			<NavbarText className='text-white float-right navtxt'>
				<NavLink
					className='text-white text-large'
					to={loggedIn ? '/logout' : '/auth'}>
					{loggedIn ? 'Logout' : 'Login'}
				</NavLink>
			</NavbarText>
		</Navbar>
	)
};

export default Header;
