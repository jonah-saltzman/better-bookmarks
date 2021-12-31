import {
	SET_USER,
	SET_TOKEN,
	SET_LOGIN,
	SET_FOLDERS,
	RESET_SIGNIN,
	SET_SHOW_LOGOUT,
	SET_PREV_USER,
	SET_SINGLE_FOLDER,
	SET_SINGLE_FOLDER_NAME,
	SET_USER_ID,
	SET_TWT_CHALLENGE,
  SET_TWT_AUTH
} from './action.types'

export default (state, action) => {
  switch (action.type) {
    case SET_TWT_AUTH:
      return Object.keys(action.payload).length === 4
				? { ...state, twtAuth: action.payload }
				: {
						...state,
						twtAuth: {
							authed: false,
							twtId: null,
							twtToken: null,
							twtSecret: null,
						},
				  }
    case SET_TWT_CHALLENGE:
      return action.payload === null
        ? { ...state, twtChallenge: null}
        : { ...state, twtChallenge: action.payload}
    case SET_USER_ID:
      return action.payload === null
        ? { ...state, userId: null}
        : { ...state, userId: action.payload}
    case SET_SINGLE_FOLDER_NAME:
      return { ...state, folderName: action.payload}
    case SET_SINGLE_FOLDER:
      return { ...state, folder: action.payload}
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
    default:
      return state
  }
}