import {Outlet} from 'react-router-dom';
import MainNavigation from "../../components/MainNavigation/MainNavigation.jsx";


export default function RootPage() {
    return (
        <>
            <MainNavigation/>
            <main>
                <Outlet/></main>
        </>
    )
}