import React, { useContext } from 'react'

import { AppContext } from '../context/Context'

import Large from '../components/Large'

const Shared = () => {
	const { state } = useContext(AppContext)
	const { sharedFolder } = state

	return (
        <Large sharedFolder={sharedFolder} oneFolder={null} back={null} />
    )
}

export default Shared
