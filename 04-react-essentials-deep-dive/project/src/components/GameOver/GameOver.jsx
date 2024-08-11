import "./GameOver.css"

export default function GameOver({winner, players, rematchOnClick}) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner === null ? (<p>It's a draw!</p>) : (<p>{players[winner]} won!</p>)}
            <p>
                <button onClick={rematchOnClick}>Rematch!</button>
            </p>
        </div>
    )
}