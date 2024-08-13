import {useRef, useState} from "react";

export default function NewTask({onAdd}) {
    const inputRef = useRef()
    const [task, setTask] = useState("")

    const buttonOnClick = () => {
        const task = inputRef.current.value

        setTask(task)
        if (task.trim() !== "")
            onAdd(task)
        inputRef.current.value = ""
    }

    return (
        <div className="flex items-center gap-4">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" ref={inputRef} defaultValue={task}/>
            <button className="text-stone-700 hover:text-stone-950" onClick={buttonOnClick}>Add task</button>
        </div>
    )
}