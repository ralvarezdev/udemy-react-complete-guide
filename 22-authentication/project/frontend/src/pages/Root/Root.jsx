import {Outlet, useLoaderData, useSubmit} from 'react-router-dom';

import MainNavigation from '../../components/MainNavigation/MainNavigation.jsx';
import {getAuthToken, getTokenDuration} from "../../util/auth.js";
import {useEffect} from "react";

function RootLayout() {
    const token = useLoaderData()
    const submit = useSubmit()
    // const navigation = useNavigation();

    useEffect(() => {
        if (!token) {
            submit(null, {action: '/logout', method: 'post'})
            return
        }

        const tokenDuration = getTokenDuration()
        console.log(tokenDuration)

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'post'})
        }, tokenDuration)
    }, [token, submit])

    return (
        <>
            <MainNavigation/>
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet/>
            </main>
        </>
    );
}

export default RootLayout;

export const loader = () => {
    return getAuthToken()
}