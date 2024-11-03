// components/ToDoList.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addItem, removeItem } from "../features/toDoListSlice";
import ToDoListComponent from "./ToDoListComponent";

export default function ToDoList() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.item.items);
    const [inputValue, setInputValue] = useState("");

    const handleAddItem = () => {
        if (inputValue.trim()) {
            dispatch(addItem(inputValue.trim()));
            setInputValue("");
        }
    };

    return (
        <div className="main">
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Add a new task"
            />
            <button onClick={handleAddItem}>Add</button>
            <ul className="main-list">
                {items.map(item => (
                    <ToDoListComponent 
                        key={item.id} 
                        item={item} 
                        onRemove={() => dispatch(removeItem(item.id))}
                    />
                ))}
            </ul>
        </div>
    );
}
