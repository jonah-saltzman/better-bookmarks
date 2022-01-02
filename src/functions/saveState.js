const saveState = (state, origin) => {
    console.log(`received state from ${origin}:`)
    console.log(state)
	const stateString = JSON.stringify({...state, savedState: true})
    console.log('saving state as:')
    console.log(stateString)
    localStorage.setItem('state', stateString)
    const storlen = localStorage.length
    console.log('NEW LOCAL STORAGE')
    for (let i = 0; i < storlen; i++) {
        const key = localStorage.key(i)
        console.log(`${key}: `)
        console.log(localStorage.getItem(key))
    }
}

export default saveState