import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import EditEventPage from './pages/EditEvent/EditEvent.jsx';
import ErrorPage from './pages/Error/Error.jsx';
import EventDetailPage, {
    action as deleteEventAction,
    loader as eventDetailLoader,
} from './pages/EventDetail/EventDetail.jsx';
import EventsPage, {loader as eventsLoader} from './pages/Events/Events.jsx';
import EventsRootLayout from './pages/EventsRoot/EventsRoot.jsx';
import HomePage from './pages/Home/Home.jsx';
import NewEventPage from './pages/NewEvent/NewEvent.jsx';
import RootLayout, {loader as rootLoader} from './pages/Root/Root.jsx';
import {action as manipulateEventAction} from './components/EventForm/EventForm.jsx';
import AuthenticationPage, {action as authenticateAction} from './pages/Authentication/Authentication.jsx';
import {action as logoutAction} from './pages/Logout/Logout.jsx';
import {loader as checkAuthLoader} from './util/auth.js';
import NewsletterPage, {action as newsletterAction} from './pages/Newsletter/Newsletter.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        element: <RootLayout/>,
        loader: rootLoader,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {
                path: 'events',
                element: <EventsRootLayout/>,
                children: [
                    {
                        index: true,
                        element: <EventsPage/>,
                        loader: eventsLoader,
                    },
                    {
                        path: ':eventId',
                        id: 'event-detail',
                        loader: eventDetailLoader,
                        children: [
                            {
                                index: true,
                                element: <EventDetailPage/>,
                                action: deleteEventAction,
                            },
                            {
                                path: 'edit',
                                element: <EditEventPage/>,
                                loader: checkAuthLoader,
                                action: manipulateEventAction,
                            },
                        ],
                    },
                    {
                        path: 'new',
                        loader: checkAuthLoader,
                        element: <NewEventPage/>,
                        action: manipulateEventAction,
                    },
                ],
            },
            {path: "auth", action: authenticateAction, element: <AuthenticationPage/>},
            {
                path: 'newsletter',
                element: <NewsletterPage/>,
                action: newsletterAction,
            },
            {
                path: "logout",
                action: logoutAction
            }
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
