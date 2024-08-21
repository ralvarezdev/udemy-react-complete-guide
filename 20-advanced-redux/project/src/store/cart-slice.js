import {createSlice} from '@reduxjs/toolkit'

const cartInitialState = {items: [], totalQuantity: 0, changed: false}

const cartSlice = createSlice({
    name: "cart", initialState: cartInitialState, reducers: {
        replaceCart: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
        addItem: (state, action) => {
            const item = action.payload
            const existingItem = state.items.find(i => i.id === item.id)

            state.changed = true
            state.totalQuantity++

            if (!existingItem)
                state.items.push({
                    id: item.id,
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price,
                    name: item.title
                })

            else {
                existingItem.quantity++
                existingItem.totalPrice += item.price
            }
        }, removeItem: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)

            state.changed = true
            state.totalQuantity--

            if (existingItem.quantity === 1)
                state.items = state.items.filter(item => item.id !== id)

            else {
                existingItem.quantity--
                existingItem.totalPrice -= existingItem.price
            }
        }
    }
})


export const cartReducer = cartSlice.reducer
export const {addItem: cartAddItem, removeItem: cartRemoveItem, replaceCart} = cartSlice.actions