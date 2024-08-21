import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Notification from "./components/UI/Notification.jsx";
import {fetchCartData, sendCartData} from "./store/cart-actions.js";

let isInitial = true

function App() {
    const cartIsVisible = useSelector(state => state.ui.cartIsVisible)
    const cart = useSelector(state => state.cart)
    const notification = useSelector(state => state.ui.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isInitial) {
            isInitial = false
            dispatch(fetchCartData())
            return
        }

        if (cart.changed)
            dispatch(sendCartData(cart))

    }, [cart]);

    return (
        <>
            {notification &&
                <Notification title={notification.title} message={notification.message} status={notification.status}/>}
            <Layout>
                {cartIsVisible && <Cart/>}
                <Products/>
            </Layout>
        </>
    );
}

export default App;
