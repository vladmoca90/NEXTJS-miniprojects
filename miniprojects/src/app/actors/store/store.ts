import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import actorsReducer from "./features/actorsSlice";

export const store = configureStore({
  reducer: {
    actors: actorsReducer,
  },
});

/*
 * Type representing the complete Redux state.
 *
 * Example:
 *
 * state.actors
 */
export type RootState = ReturnType<
  typeof store.getState
>;

/*
 * Type representing Redux dispatch.
 */
export type AppDispatch = typeof store.dispatch;

/*
 * Typed version of useDispatch.
 *
 * Use this instead of:
 *
 * const dispatch = useDispatch();
 */
export const useAppDispatch = () =>
  useDispatch<AppDispatch>();

/*
 * Typed version of useSelector.
 *
 * This means TypeScript understands:
 *
 * state.actors
 * state.actors.searchQuery
 * state.actors.filteredActors
 * etc.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;