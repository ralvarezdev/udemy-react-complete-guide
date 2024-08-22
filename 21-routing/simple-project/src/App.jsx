import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import RootPage from "./pages/RootPage/RootPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage.jsx";

const router = createBrowserRouter([
    {
        path: "/", element: <RootPage/>, errorElement: <ErrorPage/>, children: [
            {index: true, element: <HomePage/>},
            {path: "products", element: <ProductsPage/>},
            {path: "products/:productId", element: <ProductDetailPage/>},
        ]
    },
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
