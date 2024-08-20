import logoImg from '../../assets/logo.jpg';
import Button from "../UI/Button/Button.jsx";
import {useContext} from "react";
import CartContext from "../../store/CartContext.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

export default function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const totalCartItems = cartContext.items.reduce((accum, item) => accum + item.quantity, 0)

    const showCartHandler = () => userProgressContext.showCart()

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant"/>
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button onClick={showCartHandler} textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}