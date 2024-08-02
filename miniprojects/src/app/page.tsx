"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CountriesListComponent } from "./countriesListComponent";
import { Country } from "../../data/countriesList/countryList";

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
                query.includes(country.name.common) ||
                query.includes(country.name.official) ||
                query.toLowerCase().includes(country.name.common) ||
                query.toLowerCase().includes(country.name.official));
        }
    }, [countries, query]);

    useEffect(() => {
        getCountriesList();
    }, [getCountriesList]);

    return (
        <div>
            <input onChange={getSearchedCountry} value={query} type="text" placeholder="Search here..." />
            <div>
                {
                    getFilteredCountries().map((country, index) => {
                        return (
                            <CountriesListComponent country={country} key={index} />
                        );
                    })
                }
            </div>
        </div>
    )
}