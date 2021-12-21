//TODO: DONE create contact using all actions

import {
  SET_CONTACT,
  SET_LOADING,
  CONTACT_TO_UPDATE,
  SET_SINGLE_CONTACT,
  SET_IN_AUTH,
  TOGGLE_AUTH,
  SET_EMAIL,
  SET_TOKEN,
  SET_LOGIN,
  SET_FOLDERS,
  RESET_SIGNIN
} from "./action.types";

//TODO: DONE use switch case
export default (state, action) => {
  switch (action.type) {
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
    case SET_EMAIL:
      return action.payload === null
        ? { ...state, email: null}
        : { ...state, email: action.payload}
    case SET_TOKEN:
      return action.payload === null || action.payload === false
        ? { ...state, token: null}
        : { ...state, token: action.payload}
    case TOGGLE_AUTH:
      return {...state, signIn: action.payload}
    case SET_IN_AUTH:
      return action.payload === null
        ? { ...state, inAuth: false}
        : { ...state, inAuth: action.payload}
    case SET_CONTACT:
      return action.payload == null
        ? { ...state, contacts: [] }
        : { ...state, contacts: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
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
