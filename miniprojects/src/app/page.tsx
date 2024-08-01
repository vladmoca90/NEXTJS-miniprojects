"use client";
import { useCallback, useEffect, useState } from "react";
import { CountriesListComponent } from "./countriesListComponent";
import { Country } from "../../data/countriesList/countryList";

export default function CountriesList() {
    const countriesListUrl = "https://restcountries.com/v3.1/all?fields=name,flags,languages,currencies,cca2,cca3";

    const [countries, setCountries] = useState<Country[]>([]);

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

    useEffect(() => {
        getCountriesList();
    }, [getCountriesList]);

    return (
        <div>
            {
                countries.map((country, index) => {
                    return (
                        <CountriesListComponent country={country} key={index} />
                    );
                })
            }
        </div>
    )
}