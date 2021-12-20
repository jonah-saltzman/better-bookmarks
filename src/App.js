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
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ViewContact from "./pages/ViewContact";
import PageNotFound from "./pages/PageNotFound";
import Auth from "./pages/Auth"

// context api stuffs
//TODO: DONE  import reducers and contexts
import reducer from "./context/reducer";
import { AppContext } from "./context/Context";
import { SET_CONTACT, SET_LOADING } from "./context/action.types";

// first state to provide in react reducer
const initialState = {
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false,
  // Mine
  inAuth: false,
  loggedIn: false,
  signIn: true,
  twtAuth: false,
  email: null,
  token: null,
  folders: [],
  folderToUpdate: null,
  folderIdToUpdate: null,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { token } = state

  // will get contacts from firebase and set it on state contacts array
  const getFolders = async () => {
    // GetFolders
  };

  // getting contact  when component did mount
  useEffect(() => {
    getFolders();
  }, [state.loggedIn]);

  useEffect(() => {
    console.log(`new token : ${token}`)
  }, [token])

  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        <ToastContainer theme="dark" />
        <Header />
        <Container>
          <Switch>
            <Route exact path="/auth" component={Auth}></Route>
            <Route exact path="/contact/add" component={AddContact} />
            <Route exact path="/contact/view" component={ViewContact} />
            <Route exact path="/" component={Contacts} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </Container>
      </AppContext.Provider>
    </Router>
  );
};

export default App;
