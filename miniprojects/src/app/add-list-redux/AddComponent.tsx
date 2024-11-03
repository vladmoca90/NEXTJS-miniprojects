"use client";
import { useRef } from "react";
import { useAppDispatch } from "./add-list-redux/store/store";
import { addPerson } from "./add-list-redux/store/features/personSlice";

export const AddComponent = () => {
    const nameRef = useRef<string>(""); 
    const dispatch = useAppDispatch();

    const handleAddPerson = () => {
        if (nameRef.current.trim()) {
            dispatch(addPerson({ name: nameRef.current }));
            nameRef.current = "";
        }
    };

    return (
        <div className="border rounded-md p-2 shadow-md m-2">
            <label htmlFor="person">Person Name:</label>
            <input
                type="text"
                id="person"
                className="border rounded-md p-2 mx-2"
                onChange={(e) => (nameRef.current = e.target.value)}
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
