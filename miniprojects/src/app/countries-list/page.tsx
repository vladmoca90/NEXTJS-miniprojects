"use client";

import { useEffect, useState } from "react";

export default function CountriesList() {
    const countriesListUrl = "https://restcountries.com/v3.1/all?fields=name,flags,languages,currencies,cca2,cca3";

    const [countries, getCountries] = useState<[]>([]);

    useEffect(() => {

    }, []);

    return (
        <div></div>
    );
}