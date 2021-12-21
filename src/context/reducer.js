//TODO: DONE create contact using all actions

import {
  SET_CONTACT,
  CONTACT_TO_UPDATE,
  SET_SINGLE_CONTACT,
  //SET_IN_AUTH,
  //TOGGLE_AUTH,
  SET_USER,
  SET_TOKEN,
  SET_LOGIN,
  SET_FOLDERS,
  RESET_SIGNIN,
  SET_SHOW_LOGOUT,
  SET_PREV_USER
} from "./action.types";

//TODO: DONE use switch case
export default (state, action) => {
  switch (action.type) {
    case SET_PREV_USER:
      return action.payload === null
        ? { ...state, prevUser: null}
        : { ...state, prevUser: action.payload}
    case SET_SHOW_LOGOUT:
      return { ...state, showLogout: action.payload }
    case RESET_SIGNIN:
      return { ...state, signIn: true}
    case SET_FOLDERS:
      return action.payload === null
        ? { ...state, folders: []}
        : { ...state, folders: action.payload}
    case SET_LOGIN:
      return action.payload === null
        ? { ...state, loggedIn: false}
        : { ...state, loggedIn: action.payload}
    case SET_USER:
      return action.payload === null
        ? { ...state, user: null}
        : { ...state, user: action.payload}
    case SET_TOKEN:
      return action.payload === null || action.payload === false
        ? { ...state, token: null}
        : { ...state, token: action.payload}
    case SET_CONTACT:
      return action.payload === null
        ? { ...state, contacts: [] }
        : { ...state, contacts: action.payload };
    case CONTACT_TO_UPDATE:
      return {
        ...state,
        contactToUpdate: action.payload,
        contactToUpdateKey: action.key,
      };
    case SET_SINGLE_CONTACT:
      return {
        ...state,
        contact: action.payload,
      };

    default:
      return state;
  }
};
