"use client";
import { useState } from "react";
import { useAppDispatch } from "./store/store";
import { addPerson } from "./store/features/personSlice";

export const AddComponent = () => {
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();

    const handleAddPerson = () => {
        if (name.trim()) {
            dispatch(addPerson({ name }));
            setName("");
        }
    };

    return (
        <div className="border rounded-md p-2 shadow-md m-2">
            <label htmlFor="person">Person Name:</label>
            <input
                type="text"
                id="person"
                value={name}
                className="border rounded-md p-2 mx-2"
                onChange={(e) => setName(e.target.value)}
            />
            <button
                onClick={handleAddPerson}
                className="bg-violet-500 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-violet-600 active:bg-violet-700"
            >
                Add
            </button>
        </div>
    );
};
