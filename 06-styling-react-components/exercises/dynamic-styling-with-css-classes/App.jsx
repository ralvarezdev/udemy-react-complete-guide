import React from 'react'

function App() {
    const [lastClicked, setLastClicked] = React.useState(null)

    const buttonOnClick = buttonChoice => setLastClicked(buttonChoice)

    const getColor = () => {
        if (lastClicked === null)
            return "white"

        return lastClicked ? "green" : "red"
    }

    const getClassName = () => {
        if (lastClicked === null)
            return ""

        return lastClicked ? "highlight-green" : "highlight-red"
    }

    return (
        <div id="app">
            <h1 className={getClassName()} style={{color: getColor()}}>CSS is great!</h1>
            <menu>
                <li>
                    <button onClick={() => buttonOnClick(true)}>Yes</button>
                </li>
                <li>
                    <button onClick={() => buttonOnClick(false)}>No</button>
                </li>
            </menu>
        </div>
    );
}

export default App;