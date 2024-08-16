import {useCallback, useState} from "react";
import Questions from "../../questions.js";
import Summary from "../Summary/Summary.jsx";
import Question from "../Question/Question.jsx";

const QUIZ_TIMER = 10000

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length
    const quizIsCompleted = activeQuestionIndex >= Questions.length

    console.log(userAnswers)

    const answerOnSelect = useCallback(selectedAnswer =>
            setUserAnswers(prevUserAnswers => [...prevUserAnswers, selectedAnswer])
        , [])

    return (
        <div id="quiz">
            {quizIsCompleted ? <Summary userAnswers={userAnswers}/> : null}
            {!quizIsCompleted ?
                <Question key={activeQuestionIndex} questionIndex={activeQuestionIndex} answerOnSelect={answerOnSelect}
                          timeout={QUIZ_TIMER} selectedAnswer={userAnswers[userAnswers.length - 1]}/> : null}
        </div>
    )
}