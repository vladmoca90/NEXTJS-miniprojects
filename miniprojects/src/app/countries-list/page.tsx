"use client";
import "./styles/countries-list.css";
import { useCallback, useEffect, useState } from "react";
import { CountriesRowComponent } from "./CountriesRowComponent";
import { Country } from "../../data/countriesList/countryList"; // Ensure Country type is correctly defined

// https://restcountries.com/

export default function CountriesList() {
    const countriesListUrl = "https://restcountries.com/v3.1/all?fields=name,flags,languages,currencies,cca2,cca3";

    const [countries, setCountries] = useState<Country[]>([]);
    const [query, setQuery] = useState("");

    const getCountriesList = useCallback(async () => {
        try {
            const res = await fetch(countriesListUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            } else {
                console.log("The data is valid!");
            }

            const data: Country[] = await res.json(); // Type the response data

            console.log(data);
            setCountries(data);
        } catch (error) {
            console.error(error); // Handle fetch errors
        }
    }, [countriesListUrl]); // Ensure dependencies are correct

    const getSearchedCountry = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    const getFilteredCountries = useCallback(() => {
        if (!query) {
            return countries;
        } 
        const lowerCaseQuery = query.toLowerCase();
        return countries.filter(country =>
            country.name.common.toLowerCase().includes(lowerCaseQuery) ||
            country.name.official.toLowerCase().includes(lowerCaseQuery)
        );
    }, [countries, query]);

    useEffect(() => {
        getCountriesList();
    }, [getCountriesList]);

    return (
        <div>
            <input
                onChange={getSearchedCountry}
                value={query}
                className="countries-search"
                type="text"
                placeholder="Search here..."
            />
            <div className="main">
                <ul className="countries-list">
                    <li className="list-title">
                        <span className="country-name">Name</span>
                        <span className="country-name">Official Name</span>
                        <span className="country-img">Flag</span>
                        <span className="country-description">Flag Description</span>
                    </li>
                    {getFilteredCountries().map((country) => {
                        return (
                            <CountriesRowComponent country={country} key={country.cca2} /> // Using cca2 as the unique key
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
