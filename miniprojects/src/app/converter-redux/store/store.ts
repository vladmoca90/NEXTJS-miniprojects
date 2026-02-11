import { configureStore } from "@reduxjs/toolkit";
import converterReducer from "./converter/converterState";

export const store = configureStore({
    reducer: {
        counter: converterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;