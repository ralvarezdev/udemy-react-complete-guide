import MainNavigation from "../../components/MainNavigation/MainNavigation.jsx";
import {Outlet} from 'react-router-dom'

export default function RootPage() {
    return (
        <>
            <MainNavigation/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}