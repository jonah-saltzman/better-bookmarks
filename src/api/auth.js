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
                twtChallenge: data.twtChallenge || null
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
                        twtChallenge: login.twtChallenge
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
        console.log(`in logout, response:`)
        const data = await response.json()
        console.log(data)
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