import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Actor } from "../../../../../data/actors/Actor";

/*
 * The fields the user is allowed to search.
 */
export type ActorSearchField =
  | "name"
  | "biography";

/*
 * Structure of the actors Redux state.
 */
interface ActorsState {
  actors: Actor[];
  filteredActors: Actor[];
  searchQuery: string;
  searchField: ActorSearchField;
  searchError: string | null;
}

/*
 * Filters actors based on:
 *
 * 1. the complete actors array
 * 2. the search query
 * 3. the selected search field
 *
 * This calculation belongs in Redux rather than
 * inside the React component.
 */
const filterActors = (
  actors: Actor[],
  query: string,
  field: ActorSearchField,
): Actor[] => {
  const normalizedQuery = query
    .trim()
    .toLowerCase();

  /*
   * Do not perform a search until the user
   * enters at least 2 characters.
   */
  if (normalizedQuery.length < 2) {
    return actors;
  }

  /*
   * Search either:
   *
   * actor.name
   *
   * or:
   *
   * actor.biography
   *
   * depending on the selected field.
   */
  return actors.filter((actor) =>
    actor[field]
      .toLowerCase()
      .includes(normalizedQuery),
  );
};

/*
 * Returns an error if the user has entered
 * only one character.
 */
const getSearchError = (
  query: string,
): string | null => {
  const normalizedQuery = query.trim();

  if (
    normalizedQuery.length > 0 &&
    normalizedQuery.length < 2
  ) {
    return "Please enter at least 2 characters to search.";
  }

  return null;
};

/*
 * Initial Redux state.
 */
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
    /*
     * Save actors returned by the API.
     */
    setActors(
      state,
      action: PayloadAction<Actor[]>,
    ) {
      state.actors = action.payload;

      /*
       * Recalculate filtered actors.
       *
       * Normally on initial load searchQuery is empty,
       * so this simply returns all actors.
       */
      state.filteredActors = filterActors(
        action.payload,
        state.searchQuery,
        state.searchField,
      );

      state.searchError = getSearchError(
        state.searchQuery,
      );
    },

    /*
     * Update the text entered in the search box.
     *
     * Then immediately recalculate filteredActors.
     */
    setSearchQuery(
      state,
      action: PayloadAction<string>,
    ) {
      state.searchQuery = action.payload;

      /*
       * Validate the search query.
       */
      state.searchError = getSearchError(
        action.payload,
      );

      /*
       * Filter using the new query.
       */
      state.filteredActors = filterActors(
        state.actors,
        action.payload,
        state.searchField,
      );
    },

    /*
     * Change whether we're searching:
     *
     * name
     *
     * or:
     *
     * biography
     *
     * Then recalculate filteredActors using
     * the existing search query.
     */
    setSearchField(
      state,
      action: PayloadAction<ActorSearchField>,
    ) {
      state.searchField = action.payload;

      state.filteredActors = filterActors(
        state.actors,
        state.searchQuery,
        action.payload,
      );
    },

    /*
     * Reset the search and show every actor again.
     */
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