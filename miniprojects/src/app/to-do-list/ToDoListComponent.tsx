import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./to-do-list/store/store";
import { addItem, removeItem } from "./to-do-list/store/features/toDoListSlice";
import { ListComponent } from "./ListComponent";

export default function ToDoListComponent() {
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
                    <ListComponent
                        key={item.id}
                        item={item}
                        onRemove={() => dispatch(removeItem(item.id))}
                    />
                ))}
            </ul>
        </div>
    );
}
