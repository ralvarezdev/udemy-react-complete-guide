import {uiShowNotification} from "./ui-slice.js";
import {firebaseURI} from "../config.js";
import {replaceCart} from "./cart-slice.js";

export const fetchCartData = () => {
    return async dispatch => {
        try {
            const response = await fetch(firebaseURI)
            const responseJSON = await response.json()

            if (!response.ok)
                throw new Error('Fetching cart data failed')

            dispatch(replaceCart({items: responseJSON.items || [], totalQuantity: responseJSON.totalQuantity || 0}))

        } catch (error) {
            dispatch(uiShowNotification({status: 'error', title: 'Error', message: error.message}))
        }
    }
}

export const sendCartData = (cartData) => {
    return async dispatch => {
        dispatch(uiShowNotification({status: 'pending', title: 'Sending', message: 'Sending cart data'}))

        try {
            const response = await fetch(firebaseURI, {
                method: "PUT",
                body: JSON.stringify({items: cartData.items, totalQuantity: cartData.totalQuantity})
            })

            if (!response.ok)
                throw new Error('Sending cart data failed')

            dispatch(uiShowNotification({status: 'success', title: 'Success', message: 'Sent cart data successfully'}))
        } catch (error) {
            dispatch(uiShowNotification({status: 'error', title: 'Error', message: error.message}))
        }
    }
}
