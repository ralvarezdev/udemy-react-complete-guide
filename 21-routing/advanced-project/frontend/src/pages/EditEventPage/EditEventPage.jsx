import EventForm from "../../components/EventForm/EventForm.jsx";
import {useRouteLoaderData} from 'react-router-dom'

export default function EditEventPage() {
    const data = useRouteLoaderData("event-detail")
    const fetchedEvent = data.event

    return (
        <>
            <EventForm event={fetchedEvent} method="patch"/>
        </>
    )
}