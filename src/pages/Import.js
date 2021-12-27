import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Context'
import FormGroup from 'reactstrap/lib/FormGroup'
import Form from 'reactstrap/lib/Form'
import Container from 'reactstrap/lib/Container'
import Button from 'reactstrap/lib/Button'
import { toast } from 'react-toastify'

import { twtREOne, twtRETwo } from '../constants'

import ImportField from '../components/ImportField'


const Import = ({folder}) => {

    const getInitialFields = () => {
			return [0, 1, 2, 3, 4].map((n) => ({ number: n, value: '', valid: null }))
		}
    
    const { state, dispatch } = useContext(AppContext)
    const { token } = state
    const [ callingApi, setCallingApi ] = useState(false)
    const [inputObjs, setInputObjs] = useState(getInitialFields())

    const validateInputs = () => {
        setInputObjs(inputObjs.map(input => {
            return input.value.length === 0
                ? {...input, valid: null}
                : (twtREOne.test(input.value) || twtRETwo.test(input.value))
                ? {...input, valid: 'valid'}
                : {...input, valid: 'invalid'}
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateInputs()
        if (inputObjs.some(input => input.valid === 'invalid')) {
            toast('Some inputs are invalid!', { type: 'error' })
            return
        }
        return
    }

    useEffect(() => {
        const lastObj = inputObjs[inputObjs.length - 1]
        if (lastObj.value.length > 0) {
            const newObj = {
                number: lastObj.number + 1,
                value: "",
                valid: null
            }
            setInputObjs([...inputObjs, newObj])
        }
    }, [inputObjs])

    const updateValue = (inputNumber, value) => {
        setInputObjs(inputObjs.map(input => {
            return input.number === inputNumber
                ? {...input, value: value}
                : input
        }))
    }

    return (
			<Container className='input-list'>
				<Form onSubmit={handleSubmit} className={'mt-4'}>
					<FormGroup>
						{inputObjs.map((input) => (
							<ImportField
								key={input.number}
								setValue={updateValue}
								fieldNumber={input.number}
                                valid={input.valid}
                                validate={validateInputs}
							/>
						))}
					</FormGroup>
                    <Button type='submit'>Import Tweets</Button>
				</Form>
			</Container>
		)
}

export default Import