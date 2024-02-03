"use client";
import { useCallback, useEffect, useState } from "react";
import { Person } from "../../../lib/personDetails/person";

const personsUrl = "http://localhost:3000/api/person-details";

export default function PersonDetails({ searchParams }: {
    searchParams: {
        name: string,
        password: string,
    }
}) {
    const [personDetails, setPersonDetails] = useState<Person>();

    const getPersonDetails = useCallback(async () => {
        const res = await fetch(personsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": searchParams.name,
                "password": searchParams.password
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
    }, [searchParams.name, searchParams.password]);

    useEffect(() => {
        getPersonDetails();
    }, [getPersonDetails]);

    return (
        <div id="profile">
            <table className="table-fixed">
                <thead>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Nationality</th>
                    <th>Profession</th>
                    <th>Weight</th>
                    <th>Password</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{searchParams.name}</td>
                        <td>{personDetails.personDetails.age}</td>
                        <td>{personDetails.personDetails.nationality}</td>
                        <td>{personDetails.personDetails.profession}</td>
                        <td>{personDetails.personDetails.weight}</td>
                        <td>{searchParams.password}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}