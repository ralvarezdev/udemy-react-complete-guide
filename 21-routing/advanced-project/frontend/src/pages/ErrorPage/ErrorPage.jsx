import PageContent from "../../components/PageContent/PageContent.jsx";
import {useRouteError} from 'react-router-dom'
import MainNavigation from "../../components/MainNavigation/MainNavigation.jsx";

export default function ErrorPage() {
    const error = useRouteError()

    let title = "An error ocurred!"
    let message = "Something went wrong!"

    if (error.status === 500) {
        message = error.data.message
    } else if (error.status === 404) {
        title = "Page not found!"
        message = "The requested page could not be found."
    }

    return (
        <>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}