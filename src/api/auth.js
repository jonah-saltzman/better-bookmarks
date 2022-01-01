import { BB_URL } from "../constants"

export const authenticate = async (email, password, twtId, register) => {
    const URL = BB_URL + '/auth' + (register ? '/signup' : '/login')
    console.log(`authenticating with url: `)
    console.log(URL)
    const request = {
        email: email,
        password: password,
        twtId: twtId || null
    }
    try {
        const response = await fetch(URL, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        const status = response.status
        const data = await response.json()
        if (!register) {
            return {
                error: status === 200 ? null : data,
                success: status === 200 ? data.message : null,
                token: data.token || null,
                userId: data.userId || null,
                twtChallenge: data.twtChallenge || null,
                twt: false
            }
        } else {
            if (status === 200) {
                const login = await authenticate(email, password, null, false)
                if (login.success) {
                    return {
                        error: null,
                        success: `Account created & logged in!`,
                        token: login.token,
                        userId: login.userId,
                        twtChallenge: login.twtChallenge,
                        twt: false
                    }
                } else {
                    return { error: `User ${email} created but login failed.` }
                }
            } else {
                return { error: data }
            }
        }
    } catch(error) {
        console.error(error)
        return {
            error: "Unknown error"
        }
    }
}

export const logout = async (token) => {
    const URL = BB_URL + '/user/signout'
    try {
        const response = await fetch(URL, {
            method: 'Get',
            cache: 'no-cache',
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        const status = response.status
        const data = await response.json()
        if (status === 200) {
            return {
                error: null,
                success: data.message,
            }
        } else {
            return {
                error: data.message
            }
        }
    } catch(error) {
        return { error: "Unknown error logging out." }
    }
}

export const checkTwtAuth = async (token, state) => {
    const URL = BB_URL + '/user/twt/check'
    console.log(state)
    const request = {
        state: state
    }
    try {
        const response = await fetch(URL, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        return (response.status === 200)
    } catch(error) {
        return false
    }
}

export const twitterLogin = async (token) => {
    const URL = BB_URL + '/user/twitter'
    try {
        const response = await fetch(URL, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Authorization': `JWT ${token}`
            },
        })
        const status = response.status
        const data = await response.json()
        console.log(`twitterLogin:`)
        console.log(data)
        return {
            error: status === 200 ? null : data,
            success: status === 200 ? data.message : null,
            token: status === 200 ? token : null,
            userId: data.userId || null,
            twtChallenge: data.twtChallenge || null,
            twtUser: data.twtUser || null,
            twtName: data.twtName,
            twt: true
        }
    } catch(error) {
        return false
    }
}

export const changePassword = async (token, oldPass, newPass) => {
    const URL = BB_URL + '/user/password'
    const request = {
        old: oldPass,
        new: newPass
    }
    try {
        const response = await fetch(URL, {
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        console.log(response.status)
        const data = response.status === 204 ? null : await response.json()
        return {
            error: response.status === 204 ? null : data,
            message: response.status === 204 
                ? 'Successfully changed password'
                : data.message
        }
    } catch(error) {
        return false
    }
}