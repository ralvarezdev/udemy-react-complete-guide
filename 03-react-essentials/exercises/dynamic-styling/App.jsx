import React from 'react';

// don't change the Component name "App"
export default function App() {
    const [wasClicked, setWasClicked] = React.useState()

    const buttonOnClick=()=>setWasClicked(true)

    return (
        <div>
            <p className={wasClicked?"active":""}>Style me!</p>
            <button onClick={buttonOnClick}>Toggle style</button>
        </div>
    );
}
