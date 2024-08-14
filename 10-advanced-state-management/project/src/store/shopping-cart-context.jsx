import {createContext, useReducer} from "react";
import {DUMMY_PRODUCTS} from "../dummy-products.js";

export const CartContext = createContext({
    items: [],
    addItem: () => {
    },
    updateItemQuantity: () => {
    }
})

const shoppingCartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
                id: product.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: updatedItems
        }
    }

    if (action.type === "UPDATE_ITEM_QUANTITY") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.id
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    return state
}

export default function CartContextProvider({children}) {
    const [shoppingCart, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []})

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: "ADD_ITEM",
            payload: {
                id
            }
        })
    }

    function handleUpdateCartItemQuantity(id, amount) {
        shoppingCartDispatch({
            type: "UPDATE_ITEM_QUANTITY",
            payload: {
                id,
                amount,
            },
        });
    }

    const cartContextValue = {
        items: shoppingCart.items,
        addItem: id => handleAddItemToCart(id),
        updateItemQuantity: (id, amount) => handleUpdateCartItemQuantity(id, amount)
    }

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    )
}