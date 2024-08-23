import Modal from "../Modal/Modal.jsx";
import {useContext} from "react";
import CartContext from "../../store/CartContext.jsx";
import Input from "../UI/Input/Input.jsx";
import Button from "../UI/Button/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import serverURI from "../../config.js";
import useHttp from "../../hooks/useHttp.js";
import Error from "../Error/Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)
    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp(serverURI + '/orders', requestConfig)

    const closeCheckoutHandler = () => userProgressContext.hideCheckout()

    const finishHandler = () => {
        closeCheckoutHandler()
        cartContext.clearCart()
        clearData()
    }

    const submitHandler = event => {
        event.preventDefault()

        const formatData = new FormData(event.target)
        const userData = Object.fromEntries(formatData.entries())

        console.log(userData)
        sendRequest(JSON.stringify({order: {items: cartContext.items, customer: userData}}))
    }

    const actions = (
        <>
            <Button textOnly type="button" onClick={closeCheckoutHandler}>Close</Button>
            <Button type="submit">Submit Order</Button>
        </>)

    return (
        <>{(data && !error) ? (
            <Modal open={userProgressContext.progress === "checkout"} onClose={finishHandler}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully</p>
                <p>We will get back to you with more details via email within the next few minutes</p>
                <p className="modal-actions">
                    <Button onClick={finishHandler}>Okay</Button>
                </p>
            </Modal>
        ) : (
            <Modal open={userProgressContext.progress === "checkout"} onClose={closeCheckoutHandler}>
                <form onSubmit={submitHandler}>
                    <h2>Checkout</h2>
                    <p>Total Amount: {cartContext.getTotalPrice()}</p>

                    <Input label="Full Name" type="text" id="name"/>
                    <Input label="E-mail Address" type="email" id="email"/>
                    <Input label="Street" type="text" id="street"/>

                    <div className="control-row">
                        <Input label="Postal Code" type="text" id="postal-code"/>
                        <Input label="City" type="text" id="city"/>
                    </div>

                    <p className="modal-actions">

                        {isSending ? (<span>Sending order data...</span>) : actions}
                        {error && <Error title="Failed to submit order" message={error}/>}

                    </p>
                </form>
            </Modal>)}
        </>
    )
}