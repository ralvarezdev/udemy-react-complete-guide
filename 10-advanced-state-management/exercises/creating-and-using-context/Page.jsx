import Header from './Header';
import {ThemeContext} from "./ThemeContextProvider.js"
import React from "react"

export default function Page() {
    const {theme} = React.useContext(ThemeContext)

    return (
        <div id="app" className={theme}>
            <Header/>

            <article>
                <h2>React Course</h2>
                <p>
                    A course that teaches you React from the ground up and in great depth!
                </p>
            </article>
        </div>
    );
}

