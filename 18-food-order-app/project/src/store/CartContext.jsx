import {createContext, useReducer} from 'react'

const CartContext = createContext({
    items: [],
    addItem: item => {
    },
    removeItem: (id, quantity) => {
    },
    getTotalPrice: () => {
    },
    clearCart: () => {
    }
})
export default CartContext

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const cartItemIndex = state.items.findIndex(item => item.id === action.payload.item.id)

        const updatedItems = [...state.items]

        if (cartItemIndex < 0)
            updatedItems.push({...action.payload.item})

        else {
            const item = updatedItems[cartItemIndex]
            updatedItems[cartItemIndex] = {...item, quantity: (item.quantity + action.payload.item.quantity)}
        }

        return {...state, items: updatedItems}
    }

    if (action.type === "REMOVE_ITEM") {
        const cartItemIndex = state.items.findIndex(item => item.id === action.payload.id)
        const cartItem = state.items[cartItemIndex]

        const updatedItems = [...state.items]
        const updatedQuantity = cartItem.quantity - action.payload.quantity

        if (updatedQuantity === 0)
            updatedItems.splice(cartItemIndex, 1)

        else {
            updatedItems[cartItemIndex] = {...cartItem, quantity: updatedQuantity}
        }

        return {...state, items: updatedItems}
    }

    if (action.type === "CLEAR_CART")
        return {...state, items: []}

    return state
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})

    const addItem = ((item, quantity) => dispatchCartAction({type: "ADD_ITEM", payload: {item: {...item, quantity}}}))

    const removeItem = ((id, quantity) => dispatchCartAction({type: "REMOVE_ITEM", payload: {id, quantity}}))

    const getTotalPrice = () => cart.items.reduce((accum, item) => accum + item.price * item.quantity, 0)

    const clearCart = () => dispatchCartAction({type: "CLEAR_CART"})

    const cartContext = {...cart, addItem, removeItem, getTotalPrice, clearCart}

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}