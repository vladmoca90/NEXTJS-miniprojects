import { configureStore } from "@reduxjs/toolkit";
import actorsReducer from "./features/actorsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    actors: actorsReducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
