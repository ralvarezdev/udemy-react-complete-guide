import {Outlet} from 'react-router-dom'
import EventsNavigation from "../../components/EventsNavigation/EventsNavigation.jsx";

export default function EventsRootPage() {
    return (
        <>
            <EventsNavigation/>
            <Outlet/>
        </>
    )
}