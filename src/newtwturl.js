import {
	TWTAUTH_PREFIX,
	TWTAUTH_STATE,
	TWTAUTH_CHALLENGE,
    TWTAUTH_SUFFIX
} from './constants'

const getTwtUrl = (user, challenge, state) => {
    return (
			TWTAUTH_PREFIX +
			user +
			TWTAUTH_CHALLENGE +
			challenge +
			TWTAUTH_STATE +
			state +
			TWTAUTH_SUFFIX
		)
}

export default getTwtUrl