// components/ToDoListComponent.tsx
import React from "react";
import { ListItem } from "../features/toDoListSlice";

interface ToDoListComponentProps {
    item: ListItem;
    onRemove: () => void;
}

export default function ToDoListComponent({ item, onRemove }: ToDoListComponentProps) {
    return (
        <li>
            {item.item}
            <button onClick={onRemove}>Remove</button>
        </li>
    );
}
