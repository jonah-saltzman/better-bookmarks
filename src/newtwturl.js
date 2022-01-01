import {
	TWTAUTH_PREFIX,
	TWTAUTH_STATE,
	TWTAUTH_CHALLENGE,
    TWTAUTH_SUFFIX,
	TWTLOGIN_PREFIX,
	TWTAUTH_STATE_OFFLINE
} from './constants'

const getTwtUrl = (user, challenge, state, login) => {
	if (login === null) {
		return (
			TWTAUTH_PREFIX +
			user +
			TWTAUTH_CHALLENGE +
			challenge +
			TWTAUTH_STATE +
			state +
			TWTAUTH_SUFFIX
		)
	} else {
		return (
			TWTLOGIN_PREFIX + 
			TWTAUTH_CHALLENGE + 
			challenge +
			(login.offline ? TWTAUTH_STATE_OFFLINE : TWTAUTH_STATE) + 
			state + 
			TWTAUTH_SUFFIX
		)
	}
}

export default getTwtUrl