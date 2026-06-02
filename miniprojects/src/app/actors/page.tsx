"use client";
import "../../styles/actors.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import Image from "next/image";
import { store, useAppDispatch, useAppSelector } from "./store/store";
import {
  setActors,
  setSearchField,
  setSearchQuery,
  clearSearch,
} from "./store/features/actorsSlice";

export default function GetActors() {
  return (
    <Provider store={store}>
      <ActorsContent />
    </Provider>
  );
}

function ActorsContent() {
  const actorsUrl = "http://localhost:3000/api/actors";
  const dispatch = useAppDispatch();
  const filteredActors = useAppSelector((state) => state.actors.filteredActors);
  const searchQuery = useAppSelector((state) => state.actors.searchQuery);
  const searchField = useAppSelector((state) => state.actors.searchField);
  const searchError = useAppSelector((state) => state.actors.searchError);
  const [isLoading, setIsLoading] = useState(true);

  const getActors = useCallback(async () => {
    try {
      const res = await fetch(actorsUrl);

      if (!res.ok) {
        throw new Error("The data is not valid!");
      }

      const data = await res.json();
      dispatch(setActors(data.body));
    } catch (error) {
      console.error("Error fetching actors:", error);
    } finally {
      setIsLoading(false);
    }
  }, [actorsUrl, dispatch]);

  useEffect(() => {
    getActors();
  }, [getActors]);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch],
  );

  const handleFieldChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSearchField(e.target.value as "name" | "biography"));
    },
    [dispatch],
  );

  const handleClearSearch = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

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
            <option value="biography">Biography</option>
          </select>
          <button
            type="button"
            className="clear-search-button"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        </div>
        {searchError ? <div className="search-error">{searchError}</div> : null}
      </div>

      <div className="actors-container">
        {filteredActors.length === 0 ? (
          <div className="no-actors-message">No actors found.</div>
        ) : (
          filteredActors.map((actor, index) => (
            <div key={index} className="actor-card">
              <div className="actor-image">
                <Image
                  src={actor.img}
                  alt={actor.name}
                  fill
                  className="actor-img"
                />
              </div>
              <div className="actor-info">
                <h3 className="actor-name">{actor.name}</h3>
                <p className="actor-biography">{actor.biography}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
