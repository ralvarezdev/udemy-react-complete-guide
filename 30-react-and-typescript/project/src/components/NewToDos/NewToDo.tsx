import React, {useContext, useRef} from "react";
import classes from './NewToDo.module.css'
import ToDosContext from "../../store/todos-context.tsx";

export default function NewToDo() {
    const {addToDo} = useContext(ToDosContext)

    const toDoTextInputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        const enteredText = toDoTextInputRef.current!.value

        if (enteredText.trim().length === 0)
            return

        addToDo(enteredText)
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">ToDo text</label>
            <input ref={toDoTextInputRef} type="text" id="text"/>
            <button>Add ToDo</button>
        </form>
    )
}