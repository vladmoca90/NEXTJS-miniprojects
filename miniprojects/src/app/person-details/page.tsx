"use client";
import { useCallback, useEffect, useState } from "react";
import { Person } from "../../../lib/formPersons/Person";

const personsUrl = "http://localhost:3000/api/persons";

export default function PersonDetails({ params }: {
    params: {
        name: string,
        password: string,
    }
}) {
    const [personDetails, setPersonDetails] = useState<Person>();

    const getPersonDetails = useCallback(async () => {
        const res = await fetch(personsUrl, {
            method: "POST",
            body: JSON.stringify({
                "name": params.name,
                "password": params.password
            })
        });

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setPersonDetails(data.body);
    }, [params.name, params.password]);

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
                        <td>{params.name}</td>
                        <td>{personDetails.personDetails.age}</td>
                        <td>{personDetails.personDetails.nationality}</td>
                        <td>{personDetails.personDetails.profession}</td>
                        <td>{personDetails.personDetails.weight}</td>
                        <td>{params.password}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}