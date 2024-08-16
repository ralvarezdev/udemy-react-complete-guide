import {SYMBOLS} from "../Players/Players.jsx";

import "./Log.css"

export default function Log({gameTurns}) {
    return (
        <ol id="log">
            {gameTurns.map((gameTurn, index) => (
                <li key={index}>
                    {SYMBOLS[gameTurn.player]} selected {gameTurn.cell.rowIndex + 1}, {gameTurn.cell.columnIndex + 1}
                </li>
            ))}
        </ol>
    )
}