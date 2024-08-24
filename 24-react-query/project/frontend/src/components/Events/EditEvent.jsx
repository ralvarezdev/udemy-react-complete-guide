import {useMutation, useQuery} from '@tanstack/react-query';
import {Link, useNavigate, useParams} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import {fetchEvent, queryClient, updateEvent} from "../../util/https.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
    const params = useParams()
    const navigate = useNavigate();

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['events', params.id],
        queryFn: ({signal}) => fetchEvent({signal, id: params.id})
    })

    const {mutate} = useMutation({
        mutationFn: updateEvent, onMutate: async data => {
            const newEvent = data.event
            const oldEvent = queryClient.getQueryData(['events', params.id])

            await queryClient.cancelQueries({queryKey: ['events', params.id]})
            queryClient.setQueryData(['events', params.id], newEvent)

            return {oldEvent}

        }, onError: (error, variables, context) =>
            queryClient.setQueryData(['events', params.id], context.oldEvent),
        onSettled: () => queryClient.invalidateQueries({queryKey: ['events', params.id]})
    })

    function handleSubmit(formData) {
        mutate({id: params.id, event: formData})
        navigate('../')
    }

    function handleClose() {
        navigate('../');
    }

    let content

    if (isPending)
        content = (<div className="center"><LoadingIndicator/></div>)

    if (isError)
        content = (<>
                <ErrorBlock title="Failed to load event"
                            message={error.info?.message || "Failed to load event. Please check your inputs and try again later"}/>
                <div className="form-actions">
                    <Link to="../" className="button">Okay</Link>
                </div>
            </>
        )

    if (data)
        content = (
            <EventForm inputData={data} onSubmit={handleSubmit}>
                <Link to="../" className="button-text">
                    Cancel
                </Link>
                <button type="submit" className="button">
                    Update
                </button>
            </EventForm>
        )

    return (
        <Modal onClose={handleClose}>
            {content}
        </Modal>
    );
}

/*
export const loader=({params})=>{
    return queryClient.fetchQuery({queryKey: ['events', params.id],
        queryFn: ({signal}) => fetchEvent({signal, id: params.id})})
}

export const action=async ({request, params})=>{
    const formData = await request.formData()
    const updatedEventData=Object.fromEntries(formData)

    await updateEvent({id:params.id, event:updatedEventData})
    queryClient.invalidateQueries({queryKey: ['events', params.id]})
    return redirect('../')
}
*/