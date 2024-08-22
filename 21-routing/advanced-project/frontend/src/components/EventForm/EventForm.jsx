import {Form, json, redirect, useActionData, useNavigate, useNavigation} from 'react-router-dom';

import classes from './EventForm.module.css';

export default function EventForm({method, event}) {
    const data = useActionData()
    const navigate = useNavigate();
    const navigation = useNavigation()

    const isSubmitting = navigation.state === "submitting"

    function cancelHandler() {
        navigate('..');
    }

    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((error) => <li key={error}>{error}</li>)}
                </ul>)}
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" required defaultValue={event ? event.title : ""}/>
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" required defaultValue={event ? event.image : ""}/>
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required defaultValue={event ? event.date : ""}/>
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="5" required
                          defaultValue={event ? event.description : ""}/>
            </p>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
            </div>
        </Form>
    );
}

export const action = async ({request, params}) => {
    const formData = await request.formData()
    const eventData = {
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date"),
        image: formData.get("image")
    }

    let url = "http://localhost:8080/events"
    const isEdit = request.method === "PATCH"

    if (isEdit)
        url = [url, params.id].join("/")

    const response = await fetch(url, {
        method: request.method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(eventData)
    })

    if (response.status === 422)
        return response

    if (!response.ok)
        throw json({message: "Failed to create event!"}, {status: 500})

    return redirect("/events")
}
