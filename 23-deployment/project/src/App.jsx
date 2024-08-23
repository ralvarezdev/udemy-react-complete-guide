import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {lazy, Suspense} from 'react';

// import BlogPage, { loader as postsLoader } from './pages/Blog/Blog.jsx';
import HomePage from './pages/Home/Home.jsx';
// import PostPage, { loader as postLoader } from './pages/Post/Post.jsx';
import RootLayout from './pages/Root/Root.jsx';

const BlogPage = lazy(() => import('./pages/Blog/Blog.jsx'));
const PostPage = lazy(() => import('./pages/Post/Post.jsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'posts',
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={(<p>Loading...</p>)}> <BlogPage/></Suspense>,
                        loader: () => import('./pages/Blog/Blog.jsx').then(module => module.loader())
                    },
                    {
                        path: ':id',
                        element: <Suspense><PostPage/></Suspense>,
                        loader: meta => import('./pages/Post/Post.jsx').then(module => module.loader(meta))
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
