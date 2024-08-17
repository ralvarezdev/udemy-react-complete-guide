import {useState} from "react";

export default function useInput(defaultValue, validationFunction) {
    const [enteredValue, setEnteredValue] = useState(defaultValue)
    const [didEdit, setDidEdit] = useState(false)

    const valueIsValid = validationFunction(enteredValue)

    const inputChangeHandler = event => {
        setEnteredValue(event.target.value)
        setDidEdit(false)
    }

    const inputBlurHandler = () => {
        setDidEdit(true)
    }

    return {
        value: enteredValue,
        hasError: didEdit && !valueIsValid,
        inputChangeHandler,
        inputBlurHandler
    }
}