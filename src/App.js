import React, { useState, useEffect, useReducer } from 'react'

import { Container } from 'react-bootstrap'

// react-router-dom3
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'

// react toastify stuffs
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// components
import Header from './layout/Header'
import Footer from './layout/Footer'
import PageNotFound from './pages/PageNotFound'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Folders from './pages/Folders'
import Twitter from './pages/Twitter'
import Shared from './pages/Shared'

import reducer from './context/reducer'
import { AppContext } from './context/Context'
import { SET_SAVED_STATE, SET_SHARED_FOLDER } from './context/action.types'
import saveState from './functions/saveState'

const initialState = {
	showLogout: false,
	inAuth: false,
	loggedIn: false,
	offline: false,
	twtAuth: {
		authed: false,
		twtId: null,
		twtToken: null,
		twtSecret: null,
	},
	user: {},
	userId: null,
	twtChallenge: null,
	twtState: null,
	prevUser: null,
	token: null,
	folders: [],
	folder: {},
	folerName: null,
	folderToUpdate: null,
	folderIdToUpdate: null,
	bigScreen: false,
	savedState: true,
	sharedFolder: null,
    widgets: false
}

const App = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { offline, savedState } = state
	const [ bigWindow, setBigWindow ] = useState({
		matches: window.matchMedia('(min-width: 2000px)').matches,
	})

	useEffect(() => {
        if (localStorage.getItem('twitter')) {
            const stateObj = JSON.parse(localStorage.getItem('twitter'))
            Object.entries(stateObj).forEach(([key, value]) => {
				state[key] = value
			})
            localStorage.removeItem('twitter')
        }
		if (localStorage.getItem('state')) {
			const stateObj = JSON.parse(localStorage.getItem('state'))
			Object.entries(stateObj).forEach(([key, value]) => {
				state[key] = value
			})
			dispatch({ type: SET_SAVED_STATE, payload: false })
		}
  }, [])

  useEffect(() => {
		if (window.twttr.init) {
			state.widgets = true
		} else {
		}
	}, [])

	useEffect(() => {
		if (savedState || !offline) {
			return
		}
		dispatch({ type: SET_SAVED_STATE, payload: true })
		saveState(state, false)
	}, [savedState, offline])

	const windowHandler = (e) => {
		setBigWindow({ matches: e.matches })
	}
	
	window
		.matchMedia('(min-width: 2000px)')
		.addEventListener('change', windowHandler)


	return (
		<Router>
			<AppContext.Provider value={{ state, dispatch }}>
				<ToastContainer theme='dark' />
				<Header />
				<Container fluid className='app'>
					<Switch>
						<Route exact path='/shared' element={<Shared />} />
						<Route exact path='/auth' element={<Auth />} />
						<Route path='/folders/*' element={<Folders />} />
						<Route exact path='/twitter' element={<Twitter />} />
						<Route exact path='/' element={<Home />} />
						<Route path='*' element={<PageNotFound />} />
					</Switch>
				</Container>
				{/* <Footer /> */}
			</AppContext.Provider>
		</Router>
	)
}

export default App
