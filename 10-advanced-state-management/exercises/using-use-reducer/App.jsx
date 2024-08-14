import React from "react"

export function counterReducer(state, action) {
    console.log(action.type, state)

    if (action.type === "INCREMENT") {
        const newState = {...state}
        newState.count++
        return newState
    }

    if (action.type === "DECREMENT") {
        const newState = {...state}
        newState.count--
        return newState
    }

    if (action.type === "RESET") {
        const newState = {...state}
        newState.count = 0
        return newState
    }

    return state
}

function App() {
    const [counter, counterDispatch] = React.useReducer(counterReducer, {count: 0})

    const onIncrement = () => counterDispatch({
        type: "INCREMENT"
    })

    const onDecrement = () => counterDispatch({
        type: "DECREMENT"
    })

    const onReset = () => counterDispatch({
        type: "RESET"
    })

    console.log(counter.count)

    return (
        <div id="app">
            <h1>The (Final?) Counter</h1>
            <p id="actions">
                <button onClick={onIncrement}>Increment</button>
                <button onClick={onDecrement}>Decrement</button>
                <button onClick={onReset}>Reset</button>
            </p>
            <p id="counter">{counter.count}</p>
        </div>
    );
}

export default App;

export function counterReducer(state, action) {
    console.log(action.type, state)

    if (action.type === "INCREMENT") {
        const newState = {...state}
        newState.count++
        return newState
    }

    if (action.type === "DECREMENT") {
        const newState = {...state}
        newState.count--
        return newState
    }

    if (action.type === "RESET") {
        const newState = {...state}
        newState.count = 0
        return newState
    }

    return state
}

function App() {
    const [counter, counterDispatch] = React.useReducer(counterReducer, {count: 0})

    const onIncrement = () => counterDispatch({
        type: "INCREMENT"
    })

    const onDecrement = () => counterDispatch({
        type: "DECREMENT"
    })

    const onReset = () => counterDispatch({
        type: "RESET"
    })

    console.log(counter.count)

    return (
        <div id="app">
            <h1>The (Final?) Counter</h1>
            <p id="actions">
                <button onClick={onIncrement}>Increment</button>
                <button onClick={onDecrement}>Decrement</button>
                <button onClick={onReset}>Reset</button>
            </p>
            <p id="counter">{counter.count}</p>
        </div>
    );
}

export default App;
