import Header from "./components/Header/Header.jsx";
import UserInput from "./components/UserInput/UserInput.jsx";
import {useState} from "react";
import Results from "./components/Results/Results.jsx";

function App() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 100,
        annualInvestment: 10,
        interestRate: 10,
        numberOfYears: 10
    })

    const getCamelCaseFromDashedString = dashedString =>
        dashedString.replace(/-([a-z])/g, match => match[1].toUpperCase());

    const inputOnClick = (inputId, newValue) => {
        const camelCaseId = getCamelCaseFromDashedString(inputId);

        setUserInput({
            ...userInput,
            [camelCaseId]: parseFloat(newValue)
        });
    }

    return (
        <>
            <Header/>
            <UserInput inputOnClick={inputOnClick} userInput={userInput}/>
            <Results userInput={userInput}/>
        </>
    )
}

export default App
