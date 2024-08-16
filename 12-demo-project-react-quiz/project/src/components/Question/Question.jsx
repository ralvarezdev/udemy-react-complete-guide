import QuestionTimer from "../QuestionTimer/QuestionTimer.jsx";
import Answers from "../Answers/Answers.jsx";
import {useState} from "react";
import Questions from "../../questions.js";

const SELECT_TIMEOUT = 1000
const CORRECT_TIMEOUT = 2000

export default function Question({questionIndex, answerOnSelect, timeout}) {
    const [answer, setAnswer] = useState({selectedAnswer: "", isCorrect: undefined})
    console.log(answer)

    const question = Questions[questionIndex]

    let timer = timeout
    let answerOnSkip = () => {
    }

    if (answer.selectedAnswer !== "")
        timer = answer.isCorrect === null ? SELECT_TIMEOUT : CORRECT_TIMEOUT
    else
        answerOnSkip = () => answerOnSelect(null)

    const answerOnClick = selectedAnswer => {
        setAnswer({selectedAnswer: selectedAnswer, isCorrect: null})

        setTimeout(() => {
            const isCorrect = selectedAnswer === Questions[questionIndex].answers[0]
            setAnswer({selectedAnswer: selectedAnswer, isCorrect: isCorrect})

            setTimeout(() => answerOnSelect(selectedAnswer), CORRECT_TIMEOUT)
        }, SELECT_TIMEOUT)
    }

    let answered = ""
    if (answer.selectedAnswer) {
        if (answer.isCorrect === null)
            answered = "answered"
        else
            answered = answer.isCorrect ? "correct" : "wrong"
    }

    return (
        <div id="question">
            <QuestionTimer key={timer} timeout={timer} onTimeout={answerOnSkip} mode={answered}/>
            <h2>{question.text}</h2>
            <Answers
                answers={question.answers} answered={answered}
                selectedAnswer={answer.selectedAnswer}
                onSelect={answerOnClick}
            />
        </div>
    )
}