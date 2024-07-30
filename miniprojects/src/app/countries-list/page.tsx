"use client";

import { useCallback, useEffect, useState } from "react";

export default function CountriesList() {
    const countriesListUrl = "https://restcountries.com/v3.1/all?fields=name,flags,languages,currencies,cca2,cca3";

    const [countries, getCountries] = useState<[]>([]);

    const getCountriesList = useCallback(async() => {
        const countriesData = await fetch(countriesListUrl);

        const res = await countriesData.json();

        getCountries(res);
    }, []);

    useEffect(() => {

    }, []);

    return (
        <div></div>
    );
}