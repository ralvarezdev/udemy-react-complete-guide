import {Await, defer, json, redirect, useRouteLoaderData} from "react-router-dom"
import EventItem from "../../components/EventItem/EventItem.jsx";
import EventsList from "../../components/EventsList/EventsList.jsx";
import {loadEvents} from "../EventsPage/EventsPage.jsx";
import {Suspense} from "react";

export default function EventDetailPage() {
    const {event, events} = useRouteLoaderData("event-detail")

    return (
        <>
            <Suspense fallback={(<p style={{textAlign: "center"}}>Loading...</p>)}>
                <Await resolve={event}>
                    {event => (<EventItem event={event}/>)}
                </Await>
            </Suspense>

            <Suspense fallback={(<p style={{textAlign: "center"}}>Loading...</p>)}>
                <Await resolve={events}>
                    {events => (<EventsList events={events}/>)}
                </Await>
            </Suspense>
        </>
    )
}

export const loadEvent = async id => {
    const response = await fetch("http://localhost:8080/events/" + id)

    if (!response.ok)
        throw json({message: "Could not fetch details for selected event"}, {status: 500})

    const responseJSON = await response.json()
    return responseJSON.event
}

export const loader = async ({request, params}) => {
    return defer({event: await loadEvent(params.id), events: loadEvents()})
}

export const action = async ({request, params}) => {
    const id = params.id
    const response = await fetch("http://localhost:8080/events/" + id, {method: request.method})

    if (!response.ok)
        throw json({message: "Could not delete event"}, {status: 500})

    return redirect("/events")
}