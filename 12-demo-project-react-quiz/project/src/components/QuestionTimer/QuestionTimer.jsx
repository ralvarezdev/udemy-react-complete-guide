import {useEffect, useState} from "react";

const DEFAULT_TIMER = 10000

export default function QuestionTimer({
                                          timeout = DEFAULT_TIMER, onTimeout = () => {
    }, mode = ""
                                      }) {
    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout()
        }, timeout)

        return () => clearTimeout(timer)
    }, [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => setRemainingTime(prevRemainingTime => prevRemainingTime - 16), 16)

        return () => clearInterval(interval)
    }, []);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} className={mode}/>
    )
}