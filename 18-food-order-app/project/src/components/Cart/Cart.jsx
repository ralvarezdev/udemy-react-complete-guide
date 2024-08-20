import Modal from "../Modal/Modal.jsx";
import {useContext} from "react";
import CartContext from "../../store/CartContext.jsx";
import {currencyFormatter} from "../../util/formatting.js";
import Button from "../UI/Button/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import CartItem from "../CartItem/CartItem.jsx";

export default function Cart() {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)

    const closeCartHandler = () => userProgressContext.hideCart()
    const goToCheckoutHandler = () => userProgressContext.showCheckout()

    const isCart = userProgressContext.progress === "cart"

    return (
        <Modal className="cart" open={isCart} onClose={isCart ? closeCartHandler : null}>
            <h2>Your Cart</h2>

            <ul>
                {cartContext.items.map(item => (
                    <CartItem key={item.id} name={item.name} price={item.price} quantity={item.quantity}
                              onIncrease={() => cartContext.addItem(item, 1)}
                              onDecrease={() => cartContext.removeItem(item.id, 1)}/>
                ))}
            </ul>

            <p className="cart-total">{currencyFormatter.format(cartContext.getTotalPrice())}</p>
            <p className="modal-actions">
                <Button onClick={closeCartHandler} textOnly>Close</Button>
                {cartContext.items.length > 0 && <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}