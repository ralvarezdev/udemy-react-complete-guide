import ToDoItem from "./ToDoItem.tsx";
import classes from './ToDos.module.css'
import {useContext} from "react";
import ToDosContext from "../../store/todos-context.tsx";

export default function ToDos() {
    const {items, removeToDo} = useContext(ToDosContext)

    return (
        <ul className={classes.todos}>
            {items.map(item => (<ToDoItem key={item.id} item={item} onRemoveItem={removeToDo}/>))}
        </ul>
    )
}