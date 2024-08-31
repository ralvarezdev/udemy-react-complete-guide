import ToDoItemProps from "../../models/ToDos/ToDoItemProps.ts";
import classes from './ToDoItem.module.css'

export default function ToDoItem({item, onRemoveItem}: ToDoItemProps) {
    const {text} = item

    return (
        <li className={classes.item} onClick={() => onRemoveItem(item.id)}>{text}</li>
    )
}