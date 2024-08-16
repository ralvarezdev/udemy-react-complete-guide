import quizCompletedImg from '../../assets/quiz-completed.png';
import Questions from "../../questions.js";

export default function Summary({userAnswers}) {
    const skippedAnswers = [], correctAnswers = [], wrongAnswers = []

    userAnswers.forEach((answer, index) => {
        if (answer === null)
            skippedAnswers.push(index)
        else if (answer === Questions[index].answers[0])
            correctAnswers.push(index)
        else
            wrongAnswers.push(index)
    })

    const skippedAnswersPercentage = Math.round(skippedAnswers.length / userAnswers.length * 100)
    const correctAnswersPercentage = Math.round(correctAnswers.length / userAnswers.length * 100)
    const wrongAnswersPercentage = Math.round(wrongAnswers.length / userAnswers.length * 100)

    return (
        <div id="summary">
            <img src={quizCompletedImg} alt="Trophy icon"/>
            <h2>Quiz Completed!</h2>

            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersPercentage}%</span>
                    <span className="text">skipped</span>
                </p>

                <p>
                    <span className="number">{correctAnswersPercentage}%</span>
                    <span className="text">correct</span>
                </p>

                <p>
                    <span className="number">{wrongAnswersPercentage}%</span>
                    <span className="text">wrong</span>
                </p>
            </div>

            <ol>
                {userAnswers.map((answer, index) => {
                    let questionClasses = ""

                    if (answer === null)
                        questionClasses = "skipped"
                    else
                        questionClasses = answer === Questions[index].answers[0] ? "correct" : "wrong"

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{Questions[index].text}</p>
                            <p className={["user-answer", questionClasses].join(" ")}>{answer ?? "Skipped"}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}