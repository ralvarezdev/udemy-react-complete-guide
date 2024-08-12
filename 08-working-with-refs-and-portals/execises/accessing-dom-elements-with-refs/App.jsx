import React from "react"

function App() {
    const inputFileRef = React.useRef()

    const buttonOnClick = () => inputFileRef.current.click()

    return (
        <div id="app">
            <p>Please select an image</p>
            <p>
                <input ref={inputFileRef} data-testid="file-picker" type="file" accept="image/*"/>
                <button onClick={buttonOnClick}>Pick Image</button>
            </p>
        </div>
    );
}

export default App;
