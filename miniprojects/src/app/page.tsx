"use client";
import { useCallback, useEffect, useState } from "react";
import CountriesListComponent from "../countries-table/CountryListComponent";

export default function CountriesList() {
    const countriesListUrl = "https://restcountries.com/v3.1/all?fields=name,flags,languages,currencies,cca2,cca3";

    const [countries, setCountries] = useState<[]>([]);

    const getCountriesList = useCallback(async () => {
        const res = await fetch(countriesListUrl);

        if (!res) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!")
        }

        const data = await res.json();

        setCountries(data.body);
    }, []);

    useEffect(() => {
        getCountriesList();
    }, [getCountriesList]);

    return (
        countries.map((country, index) => {
            <CountriesListComponent country={country} key={index} />
        })
    );
}