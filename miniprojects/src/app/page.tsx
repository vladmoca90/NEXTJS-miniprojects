"use client";
import "./styles/countries-list.css";
import { useCallback, useEffect, useState } from "react";
import { CountriesRowComponent } from "./CountriesRowComponent";
import { Country } from "../../data/countriesList/countryList";

// https://restcountries.com/

export default function CountriesList() {
    const countriesListUrl = "https://restcountries.com/v3.1/all?fields=name,flags,languages,currencies,cca2,cca3";

    const [countries, setCountries] = useState<Country[]>([]);
    const [query, setQuery] = useState("");

    const getCountriesList = useCallback(async () => {
        const res = await fetch(countriesListUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        console.log(data);

        setCountries(data);
    }, []);

    const getSearchedCountry = useCallback(async (e: { target: { value: string; } }) => {
        setQuery(e.target.value);
    }, []);

    const getFilteredCountries = useCallback(() => {
        if (query.length === 0 || !query) {
            return countries;
        } else {
            return countries.filter(country =>
                country.name.common.includes(query) ||
                country.name.official.includes(query) ||
                country.name.common.toLowerCase().includes(query) ||
                country.name.official.toLowerCase().includes(query));
        }
    }, [countries, query]);

    useEffect(() => {
        getCountriesList();
    }, [getCountriesList]);

    return (
        <div>
            <input onChange={getSearchedCountry} value={query} className="countries-search" type="text" placeholder="Search here..." />
            <div className="main">
                <ul className="countries-list">
                    <li className="list-title">
                        <span className="country-name">Name</span>
                        <span className="country-name">Official name</span>
                        <span className="country-img">Flag</span>
                        <span className="country-description">Flag description</span>
                    </li>
                    {
                        getFilteredCountries().map((country, index) => {
                            return (
                                <CountriesRowComponent country={country} key={index} />
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}