"use-client";
import { useCallback, useState } from "react";
import { Person } from "../../../lib/formPersons/Person";

export default async function PersonDetails({ params }: {
    params: {
        name: string,
        password: string,
    }
}) {
    let personsUrl = "http://localhost:3000/api/form-persons";

    const [person, setPersonDetails] = useState<Person[]>();

    const submit = useCallback(async () => {
        const res= await fetch(personsUrl, {
            method: "POST",
            body: JSON.stringify({
                "name": params.name,
                "password": params.password
            })
        });

        if(!res.ok) {
            throw new Error("Failed to fetch the data");
        }

        const data = await res.json();

        setPersonDetails(data.person);
    }, [params.name, params.password, personsUrl]);

    return (
        <div id="profile">
            <table>
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}