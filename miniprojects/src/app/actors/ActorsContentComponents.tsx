"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "./store/store";

import {
  setActors,
  setSearchField,
  setSearchQuery,
  clearSearch,
} from "./store/features/actorsSlice";

const ACTORS_URL = "/api/actors";

export default function ActorsContentComponent() {
  const dispatch = useAppDispatch();

  const filteredActors = useAppSelector(
    (state) => state.actors.filteredActors,
  );

  const searchQuery = useAppSelector(
    (state) => state.actors.searchQuery,
  );

  const searchField = useAppSelector(
    (state) => state.actors.searchField,
  );

  const searchError = useAppSelector(
    (state) => state.actors.searchError,
  );

  const [isLoading, setIsLoading] = useState(true);

  /*
   * Fetch actors from the API.
   *
   * Once received, we send them to Redux.
   * Redux is responsible for storing and filtering them.
   */
  const getActors = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await fetch(ACTORS_URL);

      if (!res.ok) {
        throw new Error("Failed to fetch actors.");
      }

      const data = await res.json();

      dispatch(setActors(data.body));
    } catch (error) {
      console.error("Error fetching actors:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  /*
   * Load actors when the component first renders.
   */
  useEffect(() => {
    getActors();
  }, [getActors]);

  /*
   * When the user types:
   *
   * 1. Get the input value.
   * 2. Send it to Redux.
   * 3. Redux updates searchQuery.
   * 4. Redux recalculates filteredActors.
   */
  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setSearchQuery(e.target.value));
  };

  /*
   * Change the property we want to search.
   *
   * For example:
   * name
   * biography
   *
   * Redux then recalculates filteredActors.
   */
  const handleFieldChange = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      setSearchField(
        e.target.value as "name" | "biography",
      ),
    );
  };

  /*
   * Clear the search.
   *
   * Redux resets:
   * searchQuery
   * searchError
   * filteredActors
   */
  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <img
          src="/loading-buffering.gif"
          alt="Loading..."
          width={200}
          height={200}
          className="loading-spinner"
        />
      </div>
    );
  }

  return (
    <section className="actors-section">
      <div className="actors-search">
        <div className="search-controls">
          <input
            type="text"
            placeholder={`Search by ${searchField}`}
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <select
            value={searchField}
            onChange={handleFieldChange}
            className="search-filter"
          >
            <option value="name">Name</option>
            <option value="biography">
              Biography
            </option>
          </select>

          <button
            type="button"
            className="clear-search-button"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        </div>

        {searchError && (
          <div className="search-error">
            {searchError}
          </div>
        )}
      </div>

      <div className="actors-container">
        {filteredActors.length === 0 ? (
          <div className="no-actors-message">
            No actors found.
          </div>
        ) : (
          filteredActors.map((actor, index) => (
            <div
              key={index}
              className="actor-card"
            >
              <div className="actor-image">
                <Image
                  src={actor.img}
                  alt={actor.name}
                  fill
                  className="actor-img"
                />
              </div>

              <div className="actor-info">
                <h3 className="actor-name">
                  {actor.name}
                </h3>

                <p className="actor-biography">
                  {actor.biography}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}