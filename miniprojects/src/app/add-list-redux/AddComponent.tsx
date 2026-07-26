"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { addPerson } from "./store/features/personSlice";

export const AddComponent = () => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useAppDispatch();
    const persons = useAppSelector((state) => state.person.persons);

    const handleAddPerson = () => {
        const trimmedName = name.trim();
        const alreadyExists = persons.some((person) => person.name.toLowerCase() === trimmedName.toLowerCase());

        if (trimmedName && !alreadyExists) {
            dispatch(addPerson({ name: trimmedName }));
            setName("");
            setErrorMessage("");
            return;
        }

        if (trimmedName && alreadyExists) {
            setErrorMessage("The person already exists in the list!");
        } else {
            setErrorMessage("");
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
            {errorMessage ? (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            ) : null}
        </div>
    );
};
