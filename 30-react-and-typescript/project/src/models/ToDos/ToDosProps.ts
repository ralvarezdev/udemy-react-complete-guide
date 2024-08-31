import * as React from "react";
import ToDoItem from "./ToDoItem.ts";

export default interface ToDosProps {
    items: ToDoItem[]
    onRemoveItem: (id: number) => void
    children?: React.ReactNode
}
