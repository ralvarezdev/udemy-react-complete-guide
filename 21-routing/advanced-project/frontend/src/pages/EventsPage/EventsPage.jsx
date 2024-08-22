import {Suspense} from "react"
import {Await, defer, json, useLoaderData} from "react-router-dom"
import EventsList from "../../components/EventsList/EventsList.jsx";

export default function EventsPage() {
    const {events} = useLoaderData()

    return (
        <Suspense fallback={(<p style={{textAlign: "center"}}>Loading...</p>)}>
            <Await resolve={events}>
                {events => (<EventsList events={events}/>)}
            </Await>
        </Suspense>
    );
}

export const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok)
        throw json({message: "Could not fetch events"}, {status: 500})

    const responseJSON = await response.json()
    return responseJSON.events
}

export const loader = () => defer({events: loadEvents()})