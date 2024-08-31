import {ToDoItem} from "./ToDoItem.ts";

export default interface ToDoItemProps {
    item: ToDoItem
    onRemoveItem: (id: number) => void
}

export function getToDoItemRandomId(): number {
    return Math.floor(Math.random() * 1000000000)
}