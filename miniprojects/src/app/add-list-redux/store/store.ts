import { configureStore } from "@reduxjs/toolkit";
import { personSlice } from "./features/personSlice"; // Updated import name to match convention
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Configure the Redux store with the person slice reducer
export const store = configureStore({
    reducer: {
        person: personSlice.reducer, // Ensure the slice name matches your state shape
    }
});

// Create typed hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>(); // Improved typing for clarity
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
