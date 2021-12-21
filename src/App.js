import React, { useReducer, useEffect, useState } from "react";

import { Container, Col, Row } from "reactstrap";

// react-router-dom3
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// react toastify stuffs
import { ToastContainer, toast } from "react-toastify";
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
import Signout from './components/Signout'

// context api stuffs
//TODO: DONE  import reducers and contexts
import reducer from "./context/reducer";
import { AppContext } from "./context/Context";
import { SET_CONTACT, SET_LOADING } from "./context/action.types";

// first state to provide in react reducer
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
  prevUser: null,
  token: null,
  folders: [],
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { token } = state

  const getFolders = async () => {
    // GetFolders
  };

  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        <ToastContainer theme="dark" />
        <Header />
        <Container>
          <Switch>
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/logout" component={Signout} />
            <Route exact path="/" component={Home} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </Container>
      </AppContext.Provider>
    </Router>
  );
};

export default App;
