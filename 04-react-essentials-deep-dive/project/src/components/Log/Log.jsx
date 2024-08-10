import {SYMBOLS} from "../Players/Players.jsx";

import "./Log.css"

export default function Log({gameTurns}){
    return (
        <ol id="log">
            {gameTurns.map((gameTurn, index) => (
                <li key={index}>
                    {SYMBOLS[gameTurn.player]} selected {gameTurn.cell.rowIndex}, {gameTurn.cell.cellIndex}
                </li>
            ))}
        </ol>
    )
}