import {useRef} from "react";

export default function Answers({answers, selectedAnswer, answered, onSelect}) {
    const shuffledAnswers = useRef(null)

    if (shuffledAnswers.current === null)
        shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5)

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer, index) => {
                const isSelectedAnswer = selectedAnswer === answer
                let answerClasses = ""

                if (isSelectedAnswer)
                    answerClasses = answered

                return (
                    <li key={index} className="answer">
                        <button onClick={() => onSelect(answer)} className={answerClasses}
                                disabled={answered !== ""}>{answer}</button>
                    </li>
                )
            })}
        </ul>
    )
}