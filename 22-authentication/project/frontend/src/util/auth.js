import {redirect} from "react-router-dom";

export function getTokenDuration() {
    const expirationISOString = localStorage.getItem('expiration')
    const expiration = new Date(expirationISOString)
    return expiration.getTime() - new Date().getTime()
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    if (!token)
        return null

    const tokenDuration = getTokenDuration()

    if (tokenDuration <= 0)
        return null

    return token
}

export const loader = () => {
    const token = getAuthToken()


    if (!token)
        return redirect('/auth')

    return null
}