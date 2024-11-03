import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Person interface
export interface Person {
    id: number;
    name: string;
}

// Define the state interface for persons
interface PersonState {
    persons: Person[];
}

// Initial state for the slice
const initialState: PersonState = {
    persons: [],
};

// Create the person slice
export const personSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<{ name: string }>) => {
            const newPerson: Person = {
                id: state.persons.length > 0 ? state.persons[state.persons.length - 1].id + 1 : 1, // Ensures unique ID
                name: action.payload.name,
            };
            state.persons.push(newPerson);
        },
        // Optionally add more reducers here (e.g., removePerson, updatePerson)
    },
});

// Export the reducer for use in the store
export default personSlice.reducer;
// Export the actions for use in components
export const { addPerson } = personSlice.actions;
