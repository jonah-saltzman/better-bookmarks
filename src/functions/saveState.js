const saveState = (state) => {
	const stateString = JSON.stringify({...state, savedState: true})
    localStorage.setItem('state', stateString)
}

export default saveState