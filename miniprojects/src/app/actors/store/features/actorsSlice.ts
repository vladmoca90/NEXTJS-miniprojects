import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "../../../../../data/actors/Actor";

export type ActorSearchField = "name" | "biography";

interface ActorsState {
  actors: Actor[];
  filteredActors: Actor[];
  searchQuery: string;
  searchField: ActorSearchField;
  searchError: string | null;
}

const filterActors = (
  actors: Actor[],
  query: string,
  field: ActorSearchField
): Actor[] => {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return actors;
  }

  return actors.filter((actor) =>
    actor[field].toLowerCase().includes(normalizedQuery)
  );
};

const initialState: ActorsState = {
  actors: [],
  filteredActors: [],
  searchQuery: "",
  searchField: "name",
  searchError: null,
};

export const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {
    setActors(state, action: PayloadAction<Actor[]>) {
      state.actors = action.payload;
      state.filteredActors = filterActors(
        action.payload,
        state.searchQuery,
        state.searchField
      );
      state.searchError =
        state.searchQuery.trim().length > 0 &&
        state.searchQuery.trim().length < 2
          ? "Please enter at least 2 characters to search."
          : null;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.searchError =
        action.payload.trim().length > 0 &&
        action.payload.trim().length < 2
          ? "Please enter at least 2 characters to search."
          : null;
      state.filteredActors = filterActors(
        state.actors,
        action.payload,
        state.searchField
      );
    },
    setSearchField(state, action: PayloadAction<ActorSearchField>) {
      state.searchField = action.payload;
      state.filteredActors = filterActors(
        state.actors,
        state.searchQuery,
        action.payload
      );
    },
    clearSearch(state) {
      state.searchQuery = "";
      state.searchError = null;
      state.filteredActors = state.actors;
    },
  },
});

export const {
  setActors,
  setSearchQuery,
  setSearchField,
  clearSearch,
} = actorsSlice.actions;

export default actorsSlice.reducer;