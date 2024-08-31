import React, {createContext, useState} from "react";
import ToDoItem from "../models/ToDos/ToDoItem.ts";
import {getToDoItemRandomId} from "../models/ToDos/ToDoItemProps.ts";

interface Wrapper {
    children: React.ReactNode
}

interface ToDosContextProps {
    items: ToDoItem[],
    addToDo: (text: string) => void,
    removeToDo: (id: number) => void
}

const ToDosContext = createContext<ToDosContextProps>({
    items: [],
    addToDo: (text: string) => {
    },
    removeToDo: (id: number) => {
    }
})
export default ToDosContext

const initialToDos = ['Learn React', 'Learn TypeScript']

export const TodosContextProvider = ({children}: Wrapper) => {
    const [toDos, setToDos] = useState(initialToDos.map(text => ({text, id: getToDoItemRandomId(), done: false})))

    const addToDoHandler = (text: string) =>
        setToDos(prevToDos => {
            return [...prevToDos, {text, id: getToDoItemRandomId(), done: false}]
        })

    const removeToDoHandler = (id: number) =>
        setToDos(prevToDos => {
            return prevToDos.filter(toDo => toDo.id !== id)
        })

    const contextValue = {
        items: toDos,
        addToDo: addToDoHandler,
        removeToDo: removeToDoHandler
    }

    return (
        <ToDosContext.Provider value={contextValue}>{children}
        </ToDosContext.Provider>

    )
}