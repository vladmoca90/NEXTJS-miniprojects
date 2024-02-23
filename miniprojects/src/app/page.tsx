"use client";
import "./styles/countries.css";
import Link from "next/link";
import { Country } from "../../lib/countries/Country";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function CountriesList() {
    let countriesUrl = "http://localhost:3000/api/countries";

    const [countries, setCountries] = useState<Country[]>([]);
    const [results, setResults] = useState<Country[]>([]);

    const getCountries = useCallback(async () => {
        const res = await fetch(countriesUrl);

        if (!res.ok) {
            throw new Error("The data could not be fetched!");
        }

        const data = await res.json();

        setCountries(data.body);
    }, [countriesUrl]);

    const getSelectedCountry = useCallback(async (e: { target: { value: string }}) => {
        const value = e.target.value;

        if (value.length === 0) {
            setResults(countries);
        } else {
            const findCountry = countries.filter((country) => {
                return value === country.name;
            });
            setResults(findCountry);
        }

        console.log(value);
    }, [countries]);

    useEffect(() => {
        getCountries();
    }, [getCountries]);

    return (
        <div>
            <div className="countries-search">
                <label className="countries-search-title">Search countries:</label>
                <input onChange={getSelectedCountry} className="countries-search-bar" title="search" name="search" type="text" placeholder="Search countries..." />
            </div>
            <div className="countries-table">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col">Country name</th>
                            <th scope="col">Country code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((result, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <td>
                                            <Link href={{
                                                pathname: "/country-name",
                                                query: {
                                                    "countryName": result.name,
                                                },
                                            }}>{result.name}</Link>
                                        </td>
                                        <td>{result.code}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}