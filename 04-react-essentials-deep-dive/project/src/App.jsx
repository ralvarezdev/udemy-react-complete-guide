import Player from "./components/Players/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";
import {PLAYERS, SYMBOLS} from "./components/Players/Players.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";

const GAME_BOARD_SIZE = 3
const INITIAL_GAME_BOARD = []

for (let i = 0; i < GAME_BOARD_SIZE; i++) {
    INITIAL_GAME_BOARD.push([])

    for (let j = 0; j < GAME_BOARD_SIZE; j++) {
        INITIAL_GAME_BOARD[i].push(null)
    }
}

function getGameBoard(gameTurns) {
    const gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])]

    for (const gameTurn of gameTurns) {
        const {cell, player} = gameTurn
        const {rowIndex, columnIndex} = cell
        gameBoard[rowIndex][columnIndex] = player
    }

    return gameBoard
}

function getActivePlayer(prevGameTurns) {
    const lastGameTurn = prevGameTurns.length > 0 ? prevGameTurns[0] : null
    const prevActivePlayer = lastGameTurn !== null ? lastGameTurn.player : null
    return prevActivePlayer !== null ? (prevActivePlayer + 1) % SYMBOLS.length : 0
}

function getWinner(gameBoard) {
    // Check rows
    for (const row of gameBoard) {
        let playerIndex = row[0]
        let counter = 0

        for (let i = 0; i < GAME_BOARD_SIZE; counter++)
            if (row[i++] !== playerIndex)
                break

        if (counter === GAME_BOARD_SIZE)
            return playerIndex
    }

    // Check columns
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        let playerIndex = gameBoard[0][i]
        let counter = 0

        for (let j = 0; j < GAME_BOARD_SIZE; counter++)
            if (gameBoard[j++][i] !== playerIndex)
                break

        if (counter === GAME_BOARD_SIZE)
            return playerIndex
    }

    // Check crosses
    let playerIndex = gameBoard[0][0]
    let counter = 0
    for (let i = 0; i < GAME_BOARD_SIZE; i++, counter++)
        if (gameBoard[i][i] !== playerIndex)
            break

    if (counter === GAME_BOARD_SIZE)
        return playerIndex

    playerIndex = gameBoard[0][GAME_BOARD_SIZE - 1]
    counter = 0
    for (let i = 0; i < GAME_BOARD_SIZE; i++, counter++)
        if (gameBoard[i][GAME_BOARD_SIZE - 1 - i] !== playerIndex)
            break

    if (counter === GAME_BOARD_SIZE)
        return playerIndex

    return null
}

function App() {
    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([])

    let activePlayer = getActivePlayer(gameTurns)
    let gameBoard = getGameBoard(gameTurns)
    const winner = getWinner(gameBoard)
    const hasDraw = gameTurns.length === GAME_BOARD_SIZE * GAME_BOARD_SIZE && winner === null

    const playerOnClick = (rowIndex, columnIndex) => {
        setGameTurns(prevGameTurns =>
            [
                {cell: {rowIndex: rowIndex, columnIndex: columnIndex}, player: activePlayer},
                ...prevGameTurns
            ]
        )
    }

    const rematchOnClick = () => setGameTurns([])

    const savePlayerNameOnClick = (index, name) => {
        setPlayers(prevPlayers => {
            const newPlayers = [...prevPlayers]
            newPlayers[index] = name
            return newPlayers
        })
    }

    let gameOver = null
    if (winner !== null || hasDraw) {
        activePlayer = gameTurns[gameTurns.length - 1].player
        gameOver = (
            <GameOver
                winner={winner}
                players={players}
                rematchOnClick={rematchOnClick}>
            </GameOver>
        )
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    {
                        SYMBOLS.map((symbol, index) => (
                            <Player
                                key={symbol}
                                symbol={symbol}
                                initialName={players[index]}
                                savePlayerNameOnClick={name => savePlayerNameOnClick(index, name)}
                                isActive={activePlayer === index}>
                            </Player>
                        ))
                    }
                </ol>
                {gameOver}
                <GameBoard
                    playerOnClick={playerOnClick}
                    symbols={SYMBOLS}
                    gameBoard={gameBoard}
                >
                </GameBoard>
            </div>
            <Log gameTurns={gameTurns}></Log>
        </main>
    )
}

export default App
