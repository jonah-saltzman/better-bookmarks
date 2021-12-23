import React, { useReducer } from "react";

import { Container } from "reactstrap";

// react-router-dom3
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// react toastify stuffs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// components
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import PageNotFound from "./pages/PageNotFound"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Folders from "./pages/Folders"
import OneFolder from './pages/OneFolder'

import reducer from "./context/reducer";
import { AppContext } from "./context/Context";

const initialState = {
  showLogout: false,
  inAuth: false,
  loggedIn: false,
  twtAuth: {
    authed: false,
    twtId: null,
    twtToken: null,
    twtSecret: null
  },
  user: null,
  userId: null,
  prevUser: null,
  token: null,
  folders: [],
  folder: {},
  folerName: null,
  folderToUpdate: null,
  folderIdToUpdate: null
};

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
		<Router basename='better-bookmarks'>
			<AppContext.Provider value={{ state, dispatch }}>
				<ToastContainer theme='dark' />
				<Header />
				<Container className='h-75'>
					<Switch>
						<Route exact path='/auth' component={Auth} />
						<Route exact path='/folders' component={Folders} />
						<Route exact path='/onefolder' component={OneFolder} />
						<Route exact path='/' component={Home} />
						<Route exact path='*' component={PageNotFound} />
					</Switch>
				</Container>
				{/* <Footer /> */}
			</AppContext.Provider>
		</Router>
	)
};

export default App;
