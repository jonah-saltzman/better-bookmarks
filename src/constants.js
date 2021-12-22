
const isDev = Boolean(
	window.location.hostname === 'localhost' ||
		window.location.hostname === '[::1]' ||
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
)

console.log(`isDev: ${isDev}`)

export const BB_URL = isDev
	? 'http://127.0.0.1:4000'
	: 'https://betterbookmarks.herokuapp.com'


export const TWTAUTH_PREFIX =
	'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YnEzOGs2Y2pLMWRUTXM2X3dYU1g6MTpjaQ&redirect_uri=' +
	(isDev
		? 'http://127.0.0.1:4000/'
		: 'https://betterbookmarks.herokuapp.com/') +
	'/twtauth?user='

export const TWTAUTH_SUFFIX =
	'&scope=tweet.read%20like.read&state=state&code_challenge=InSomnia&code_challenge_method=plain'