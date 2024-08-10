import React from 'react';

// IMPORTANT:
// In this Udemy environment, you CAN'T import & use useState like this:
// import { useState } from 'react'
// Instead, import & use it like this:
// import React from 'react';
// React.useState(...)

// don't change the Component name "App"
export default function App() {
    const [deleteState, setDeleteState] = React.useState()
    const [proceedState, setProceedState] = React.useState()

    const deleteButtonOnClick = () => setDeleteState(!deleteState)

    const proceedButtonOnClick = () => {
        setProceedState(!proceedState)
        setDeleteState(!deleteState)
    }

    let warningBox
    if (deleteState)
        warningBox = (
            <div data-testid="alert" id="alert">
                <h2>Are you sure?</h2>
                <p>These changes can't be reverted!</p>
                <button onClick={proceedButtonOnClick}>Proceed</button>
            </div>
        )

    return (
        <div>
            {deleteState && warningBox}
            <button onClick={deleteButtonOnClick}>Delete</button>
        </div>
    );
}