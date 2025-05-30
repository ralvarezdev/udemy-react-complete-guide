import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import {json, redirect} from 'react-router-dom'

function AuthenticationPage() {
    return <AuthForm/>;
}

export default AuthenticationPage;

export const action = async ({request}) => {
    const searchParams = new URL(request.url).searchParams
    const mode = searchParams.get('mode') || 'login'

    if (mode !== 'login' && mode !== 'signup')
        throw json({message: 'Invalid mode'}, {status: 422})

    const data = await request.formData()
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    }

    const response = await fetch("http://localhost:8080/" + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })

    if (response.status === 422 || response.status === 401)
        return response

    if (!response.ok)
        throw json({message: 'Could not authenticate'}, {status: 500})

    const responseData = await response.json()
    const token = responseData.token

    localStorage.setItem('token', token)
    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 1)
    localStorage.setItem('expiration', expiration.toISOString())

    return redirect('/')
}