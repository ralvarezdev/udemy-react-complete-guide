import React from 'react';

// don't change the Component name "App"
export default function App() {
    const [buttonClicked, setButtonClicked] = React.useState(false)

    const pColor=buttonClicked?"red":"white"

    const buttonOnClick=()=>setButtonClicked(clicked=>!clicked)

    return (
        <div>
            <p style={{color:pColor}}>Style me!</p>
            <button onClick={buttonOnClick}>Toggle style</button>
        </div>
    );
}
