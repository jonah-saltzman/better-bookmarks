//TODO: DONE set NavbarBrand to go to home page and export Header

import React, { useContext } from 'react'
import { Navbar, NavbarBrand, NavbarText, Button } from "reactstrap";
import { NavLink } from 'react-router-dom'
import { Link } from "react-router-dom";
import Nav from "reactstrap/lib/Nav";
import { AppContext } from '../context/Context'

const Header = () => {
  const { state, dispatch } = useContext(AppContext)
  const { inAuth, signIn } = state
  console.log(`inAuth: ${inAuth}`)
  return (
		<Navbar className='nav'>
			<NavbarBrand tag={Link} to='/' className='text-white navbrand'>
				Better Bookmarks
			</NavbarBrand>
			<NavLink to='/folders' className='text-white'>
				Folders
			</NavLink>
			<NavbarText className='text-white float-right navtxt'>
				<NavLink to='/auth'>{state.loggedIn ? 'Logout' : 'Login'}</NavLink>
			</NavbarText>
		</Navbar>
	)
};

export default Header;
