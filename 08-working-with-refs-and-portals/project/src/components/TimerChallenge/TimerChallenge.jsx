import "./TimerChallenge.css"
import {useRef, useState} from "react";
import ResultModal from "../ResultModal/ResultModal.jsx";

const INTERVAL = 50

export default function TimerChallenge({title, targetTime}) {
    const timerRef = useRef()
    const dialogRef = useRef()

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000)
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000

    if (remainingTime < INTERVAL) {
        clearInterval(timerRef.current)
        dialogRef.current.open()
    }

    const startTimer = () => {
        timerRef.current = setInterval(() =>
                setRemainingTime(prevTimeRemaining => prevTimeRemaining - INTERVAL),
            INTERVAL)
    }

    const stopTimer = () => {
        clearInterval(timerRef.current)
        dialogRef.current.open()
    }

    const resetTimer = () => setRemainingTime(targetTime * 1000)

    return (
        <>
            <ResultModal
                ref={dialogRef}
                result="lost"
                targetTime={targetTime}
                remainingTime={remainingTime}
                onReset={resetTimer}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime === 1 ? '' : 's'}
                </p>
                <p>
                    <button onClick={timerIsActive ? stopTimer : startTimer}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : ""}>
                    {timerIsActive ? "Time is running..." : "Timer inactive"}
                </p>
            </section>
        </>
    )
}