import React, { useContext, useEffect, useState } from 'react'

const ImportField = (props) => {
    const { fieldNumber, setValue, valid, validate } = props
    const [ inputValue, setInputValue ] = useState("")
    const [ validity, setValidity ] = useState(null)
    console.log(`field #${fieldNumber}.valid=${valid}`)

    useEffect(() => {
        //console.log(`field${fieldNumber} valid=${valid}`)
        //console.log(`setting validity to ${valid}`)
        setValidity(valid)
    }, [valid])

    const resetValidity = () => {
        if (!validity) {
            return
        }
        if (validity === 'valid') {
            return
        }
        setValidity(null)
    }
    
    const checkValidity = () => {
        validate()
    }

    useEffect(() => {
        setValue(fieldNumber, inputValue)
    }, [inputValue])

    return (
			<input
				className={
					'mb-4 ' +
					(!validity
						? 'folder-input'
						: validity === 'valid'
						? 'valid-input'
						: 'invalid-input')
				}
				type='text'
				name={`tweetinput-${fieldNumber}`}
				id={`tweetinput-${fieldNumber}`}
				placeholder={'Tweet ID or URL'}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onFocus={resetValidity}
				onBlur={checkValidity}
			/>
		)
}

export default ImportField