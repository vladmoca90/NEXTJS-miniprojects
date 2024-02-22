"use client";
import "./styles/countries.css";
import Link from "next/link";
import { Country } from "../../lib/countries/Country";
import { CountryNameOrCode } from "../../lib/countries/countryNameOrCode";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function CountriesList() {
    let countriesUrl = "http://localhost:3000/api/countries";

    const [countries, setCountries] = useState<Country[]>([]);
    const [countryNameOrCode, setCountryNameOrCode] = useState("");
    const [results, setResults] = useState<CountryNameOrCode[]>([]);

    const getCountries = useCallback(async () => {
        const res = await fetch(countriesUrl);

        if (!res.ok) {
            throw new Error("The data could not be fetched!");
        }

        const data = await res.json();

        setCountries(data.body);
    }, [countriesUrl]);

    const getSelectedCountry = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setCountryNameOrCode(value);

        if (value.length > 2) {
            const res = await fetch(countriesUrl);

            if (!res.ok) {
                throw new Error("The data could not be fetched!");
            }

            const data = await res.json();

            setResults(data.result);
        } else {
            return setResults([]);
        }
    }, [countriesUrl]);

    useEffect(() => {
        getCountries();
    }, [getCountries]);

    return (
        <div>
            <div className="countries-search">
                <label className="countries-search-title">Search countries:</label>
                <input onChange={getSelectedCountry} className="countries-search-bar" title="search" name="search" type="text" placeholder="Search countries..." />
                <ul id="searchCountries">
                    {
                      results.map((result, index) => {
                        if(result.type === "Name") {
                            return (
                                <li key={index}>{result.name}</li>
                            );
                        } else {
                            return (
                                <li key={index}>{result.code}</li>
                            );
                        }
                      })
                    }
                </ul>
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
                            countries.map((country, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <td>
                                            <Link href={{
                                                pathname: "/country-name",
                                                query: {
                                                    "countryName": country.name,
                                                },
                                            }}>{country.name}</Link>
                                        </td>
                                        <td>{country.code}</td>
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