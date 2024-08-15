import {useEffect, useState} from "react";

const DEFAULT_TIMER = 10000

export default function ProgressBar({timer = DEFAULT_TIMER}) {
    const [remainingTime, setRemainingTime] = useState(timer)

    useEffect(() => {
        const interval = setInterval(() => setRemainingTime(prevRemainingTime => prevRemainingTime - 16), 16)

        return () => clearTimeout(interval)
    }, []);

    return (
        <progress value={remainingTime} max={timer}/>
    )
}