import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from "@tanstack/react-query";

import Header from '../Header.jsx';
import {deleteEvent, fetchEvent, queryClient} from "../../util/https.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import {useState} from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
    const [isDeleting, setIsDeleting] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    const {
        data,
        isPending: isPendingFetch,
        isError: isErrorFetch,
        error: errorFetch
    } = useQuery({queryKey: ['events', params.id], queryFn: ({signal}) => fetchEvent({id: params.id, signal})})

    const {mutate, isPending: isPendingDeletion, isError: isErrorDeletion, error: errorDeletion} = useMutation({
        mutationFn: deleteEvent, onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['events'], refetchType: 'none'})
            navigate('/events')
        }
    })

    const startDeleteHandler = () => setIsDeleting(true)

    const deleteHandler = () => mutate({id: params.id})

    const stopDeleteHandler = () => setIsDeleting(false)

    let content

    if (isPendingFetch)
        content = (<div id="event-details-content" className="center"><p>Fetching event data...</p></div>)

    if (isErrorFetch)
        content = (<div id="event-details-content" className="center"><ErrorBlock title="Failed to load event"
                                                                                  message={errorFetch.info?.message || "Failed to fetch event data. Please try again later"}/>
        </div>)

    if (data) {
        const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })

        content = (
            <>
                <header>
                    <h1>{data.title}</h1>
                    <nav>
                        <button onClick={startDeleteHandler}>Delete</button>
                        <Link to="edit">Edit</Link>
                    </nav>
                </header>
                <div id="event-details-content">
                    <img src={`http://localhost:3000/${data.image}`} alt={data.title}/>
                    <div id="event-details-info">
                        <div>
                            <p id="event-details-location">{data.location}</p>
                            <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
                        </div>
                        <p id="event-details-description">{data.description}</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {isDeleting && (
                <Modal onClose={stopDeleteHandler}><h2>Are you sure?</h2><p>Do you really want to delete this event?
                    This action cannot be undone</p>
                    <div className="form-actions">
                        {isPendingDeletion ? (<p>Deleting event...</p>) : (
                            <>
                                <button className="button-text" onClick={stopDeleteHandler}>Cancel</button>
                                <button onClick={deleteHandler} className="button">Delete</button>
                            </>
                        )}
                    </div>
                    {isErrorDeletion && (<ErrorBlock title="Failed to delete event"
                                                     message={errorDeletion.info?.message || "Failed to delete event. Please try again later"}/>)}
                </Modal>)}
            <Outlet/>
            <Header>
                <Link to="/events" className="nav-item">
                    View all Events
                </Link>
            </Header>
            <article id="event-details">
                {content}
            </article>
        </>
    );
}
