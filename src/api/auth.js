const URL = 'https://betterbookmarks.herokuapp.com'


export const login = async (username, password, done) => {
    console.log(`logging in ${username} with ${password}`)
    const loginURL = URL + '/auth/login'
    const request = {
        email: username,
        password: password
    }
    try {
        const response = await fetch(loginURL, {
            method: 'POST',
            //mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        const status = response.status
        console.log('status type: ', typeof status)
        if (status !== 200) {
            console.log('error logging in: ')
            console.log(`status: ${status}`)
            let message
            switch (status) {
                case 404:
                    return done('Email not found')
                case 401:
                    return done('Incorrect password')
                case 500:
                    return done('Unknown server error')
                default: 
                    return done('Unknown error')
            }
        }
        const body = await response.json()
        return done(null, body.token)
    } catch (error) {
        console.error(error)
    }
}

// 401 = already exists

export const signup = async (username, password, passwordConfirm, twtId, done) => {
    if (password !== passwordConfirm) {
        return done('Passwords do not match')
    }
    const loginURL = URL + '/auth/signup'
    const request = {
        email: username,
        password: password,
        twtId: twtId || null
    }
    try {
        const response = await fetch(loginURL, {
            method: 'POST',
            //mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        const status = response.status
    } catch(error) {
        console.error(error)
    }
}
