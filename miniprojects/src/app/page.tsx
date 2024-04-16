"use client";
import "./styles/countries.css";
import { Country } from "../../data/countries/Country";
import { useCallback, useEffect, useState } from "react";
import CountryListComponent from "./CountryListComponent";
import { CountryContext } from "./countries/countriesContext/CountryContext";

export default function CountriesList() {
    const countriesUrl = "http://localhost:3000/api/countries";

    const [countries, setCountries] = useState<Country[]>([]);
    const [query, setQuery] = useState("");

    const getCountries = useCallback(async () => {
        const res = await fetch(countriesUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setCountries(data.body);
    }, [countriesUrl]);

    const getSelectedCountry = useCallback(async (e: { target: { value: string; } }) => {
        const value = e.target.value;
        setQuery(value);
    }, []);

    const searchCountries = useCallback(() => {
        if (query.length === 0) {
            return countries;
        } else {
            return countries.filter(
                country => country.name.toLowerCase().includes(query) ||
                    country.name.toUpperCase().includes(query) ||
                    country.code.toLowerCase().includes(query) ||
                    country.code.toUpperCase().includes(query)
            );
        }
    }, [countries, query]);

    useEffect(() => {
        getCountries();
    }, [getCountries, searchCountries]);

    return (
        <div>
            <div className="countries-search">
                <label className="countries-search-title">Search countries:</label>
                <input onChange={getSelectedCountry} value={query} className="countries-search-bar" title="search" name="search" type="text" placeholder="Search countries..." />
            </div>
            <div className="countries-table">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchCountries().map((country, index) => {
                                return (
                                    <CountryContext.Provider value={country} key={index}>
                                        <CountryListComponent key={index} />
                                    </CountryContext.Provider>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}