import {useState} from 'react';

import "./Player.css"
import "../Players.css"

export default function Player({initialName, symbol, isActive, savePlayerNameOnClick}) {
    const [isEditing, setEditing] = useState(false);
    let name = initialName;

    const buttonOnClick = () => {
        if (isEditing) savePlayerNameOnClick(name);

        setEditing(editing => !editing);
    }
    const inputOnChange = event => name = event.target.value

    let buttonCaption = "Edit"
    let playerName = <span className="player-name">{name}</span>

    if (isEditing) {
        buttonCaption = "Save"
        playerName = <input type="text" required defaultValue={name} onChange={event => inputOnChange(event)}/>
    }

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
               {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={buttonOnClick}>{buttonCaption}</button>
        </li>
    )
}