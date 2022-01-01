import React, { useEffect, useReducer } from "react";

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
import Twitter from "./pages/Twitter";

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
  folderIdToUpdate: null
};

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const {loggedIn} = state

  return (
		<Router basename='better-bookmarks'>
			<AppContext.Provider value={{ state, dispatch }}>
				<ToastContainer theme='dark' />
				<Header />
				<Container fluid className='h-75'>
					<Switch>
						<Route exact path='/auth' component={Auth} />
						<Route path='/folders' component={Folders} />
						<Route exact path='/twitter' component={Twitter} />
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
