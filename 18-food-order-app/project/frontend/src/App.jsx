import Header from "./components/Header/Header.jsx";
import Meals from "./components/Meals/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";

function App() {
    return (
        <CartContextProvider>
            <UserProgressContextProvider>
                <Cart key="cart"/>
                <Checkout key="checkout"/>
                <Header/>
                <Meals/>
            </UserProgressContextProvider>
        </CartContextProvider>
    );
}

export default App;
