import "./GameBoard.css"

export default function GameBoard({playerOnClick, gameBoard, symbols}){
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerIndex, columnIndex) => (
                            <li key={columnIndex}>
                                <button
                                    onClick={()=>playerOnClick(rowIndex, columnIndex)}
                                    disabled={playerIndex!==null}>
                                    {symbols[playerIndex]}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}