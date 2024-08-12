import React from "react"

import Toast from './Toast';

function App() {
    const [enrolClicked, setEnrolClicked] = React.useState(false)

    function handleEnrol() {
        setEnrolClicked(true)

        setTimeout(() => setEnrolClicked(false), 3000);
    }

    return (
        <div id="app">
            {enrolClicked ? <Toast message={"Why did you click me?"}/> : null}
            <article>
                <h2>React Course</h2>
                <p>
                    A course that teaches you React from the ground up and in great depth!
                </p>
                <button onClick={handleEnrol}>Enrol</button>
            </article>
        </div>
    );
}

export default App;
