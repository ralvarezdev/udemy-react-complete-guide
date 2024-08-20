import {createSlice} from "@reduxjs/toolkit"

const initialCounterState = {value: 0, show: true}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
        increment: (state, action) => {
            state.value += action.payload
        },
        decrement: (state, action) => {
            state.value -= action.payload
        },
        toggle: state => {
            state.show = !state.show
        }
    }
})

export const counterReducer = counterSlice.reducer
export const {increment, decrement, toggle} = counterSlice.actions