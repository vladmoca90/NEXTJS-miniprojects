"use client";
import "./../../app/styles/person-details.css";
import { useCallback, useEffect, useState } from "react";
import { Person } from "../../../lib/personDetails/person";

const personsUrl = "http://localhost:3000/api/person-details";

export default function PersonDetails({ searchParams }: {
    searchParams: {
        name: string,
    }
}) {
    const [personDetails, setPersonDetails] = useState<Person>([] as any);

    const getPersonDetails = useCallback(async () => {
        const res = await fetch(personsUrl, {
            method: "POST",
            body: JSON.stringify({
                "name": searchParams.name,
            }),
        })

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setPersonDetails(data.body);
    }, [searchParams.name]);

    useEffect(() => {
        getPersonDetails();
    }, [getPersonDetails]);

    return (
        <div id="person" className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Age</th>
                    <th scope="col" className="px-6 py-3">Nationality</th>
                    <th scope="col" className="px-6 py-3">Profession</th>
                    <th scope="col" className="px-6 py-3">Weight (in kg)</th>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{searchParams.name}</td>
                        <td className="px-6 py-4">{personDetails.age}</td>
                        <td className="px-6 py-4">{personDetails.nationality}</td>
                        <td className="px-6 py-4">{personDetails.profession}</td>
                        <td className="px-6 py-4">{personDetails.weight}kg</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}