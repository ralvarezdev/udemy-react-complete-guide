import "./ResultModal.css"
import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const ResultModal = forwardRef(function ResultModal({result, targetTime, remainingTime, onReset}, ref) {
    const dialogRef = useRef()

    const lost = remainingTime <= 0
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current.showModal()
    }))

    return createPortal((
        <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
            <h2>You {lost ? "lost" : `score: ${score}`}</h2>
            <p>The target time was <strong>{targetTime} second{targetTime === 1 ? '' : 's'}.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    ), document.querySelector("#modal"))
})

export default ResultModal