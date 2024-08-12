import React from "react"

import Form from './Form';

// Don't change the name of the 'App'
// function and keep it a named export

export function App() {
    const formRef = React.useRef()

    function handleRestart() {
        formRef.current.clear()
    }

    return (
        <div id="app">
            <button onClick={handleRestart}>Restart</button>
            <Form ref={formRef}/>
        </div>
    );
}

