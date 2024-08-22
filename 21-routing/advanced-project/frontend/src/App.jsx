// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage.jsx";
import EventsPage, {loader as eventsLoader} from "./pages/EventsPage/EventsPage.jsx";
import EventDetailPage, {
    action as eventDeleteAction,
    loader as eventDetailLoader
} from "./pages/EventDetailPage/EventDetailPage.jsx";
import {action as formEventAction} from "./components/EventForm/EventForm.jsx";
import NewsletterPage, {action as newsletterAction} from "./pages/NewsletterPage/NewsletterPage.jsx";
import NewEventPage from "./pages/NewEventPage/NewEventPage.jsx";
import EditEventPage from "./pages/EditEventPage/EditEventPage.jsx";
import RootPage from "./pages/RootPage/RootPage.jsx";
import EventsRootPage from "./pages/EventsRootPage/EventsRootPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: '/', element: <RootPage/>, errorElement: <ErrorPage/>, children: [
            {index: true, element: <HomePage/>},
            {
                path: 'events', element: <EventsRootPage/>, children: [
                    {index: true, element: <EventsPage/>, loader: eventsLoader},
                    {
                        path: ':id',
                        id: "event-detail",
                        loader: eventDetailLoader,
                        children: [{index: true, action: eventDeleteAction, element: <EventDetailPage/>},
                            {path: 'edit', action: formEventAction, element: <EditEventPage/>}]
                    }, {path: 'new', action: formEventAction, element: <NewEventPage/>}
                ],
            }, {
                path: 'newsletter',
                element: <NewsletterPage/>,
                action: newsletterAction,
            }]
    }])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
