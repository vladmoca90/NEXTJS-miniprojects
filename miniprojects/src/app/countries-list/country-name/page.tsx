"use client";
import { useCallback, useEffect, useState } from "react";
import { Country } from "../../../data/countries/Country";

// https://restcountries.com/

export default function CountryName({ searchParams }: {
    searchParams: {
        "countryName": string,
    }
}) {
    let countriesDetailsUrl = "http://localhost:3000/api/get-country-name?countryName=" + searchParams.countryName;

    const [countryDetails, setCountryDetails] = useState<Country>([] as any);

    const getCountry = useCallback(async() => {
        const res = await fetch(countriesDetailsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setCountryDetails(data.country);
    }, [countriesDetailsUrl]);

    useEffect(() => {
        getCountry();
    }, [getCountry]);

    return (
        <div>
            <div className="countries-table">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td>{countryDetails.name}</td>
                            <td>{countryDetails.code}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}