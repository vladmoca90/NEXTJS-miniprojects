"use client";
import "./styles/countries.css";
import { Country } from "../../../data/countries/Country";
import { useCallback, useEffect, useState } from "react";
import CountryListComponent from "./CountryListComponent";

// https://restcountries.com/

export default function CountriesList() {
  const countriesUrl = "http://localhost:3000/api/countries";

  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState("");

  const getCountries = useCallback(async () => {
    try {
      const res = await fetch(countriesUrl);

      if (!res.ok) {
        throw new Error("The data is not valid!");
      }

      const data = await res.json();
      setCountries(data.body);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }, [countriesUrl]);

  const getSelectedCountry = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [],
  );

  const searchCountries = useCallback(() => {
    if (query.length === 0) {
      return countries;
    }

    const lowerQuery = query.toLowerCase();

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(lowerQuery) ||
        country.code.toLowerCase().includes(lowerQuery),
    );
  }, [countries, query]);

  useEffect(() => {
    getCountries();
  }, [getCountries]); // ✅ removed searchCountries (bug fix)

  return (
    <div>
      <div className="countries-search">
        <label className="countries-search-title">Search countries:</label>
        <input
          onChange={getSelectedCountry}
          value={query}
          className="countries-search-bar"
          title="search"
          name="search"
          type="text"
          placeholder="Search countries..."
        />
      </div>

      <div className="countries-table">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Code</th>
              <th scope="col">Total countries</th>
            </tr>
          </thead>
          <tbody>
            {searchCountries().map((country, index) => (
              <CountryListComponent
                country={country}
                key={country.code || index} // ✅ better key
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
