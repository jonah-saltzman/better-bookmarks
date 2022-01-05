const saveState = (state, twitter) => {
	const stateString = JSON.stringify({...state, savedState: true})
    localStorage.setItem(twitter === true ? 'twitter' : 'state', stateString)
    return
}

export default saveState