import {useRef, useState} from "react";

import "./Player.css";

export default function Player() {
    const inputRef = useRef();
    const [name, setName] = useState('unknown entity');

    const buttonOnClick = () => {
        setName(inputRef.current.value)
        inputRef.current.value = ''
    }

    return (
        <section id="player">
            <h2>Welcome {name}</h2>
            <p>
                <input
                    ref={inputRef}
                    type="text"
                    defaultValue=""
                />
                <button onClick={buttonOnClick}>Set Name</button>
            </p>
        </section>
    );
}
