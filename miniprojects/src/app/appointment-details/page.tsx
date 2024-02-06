"use client";
import "./../styles/appointment-details.css";
import { useCallback, useEffect, useState } from "react";
import { Appointment } from "../../../lib/appointment/Appointment";

const appointmentsUrl = "http://localhost:3000/api/appointment";

export default function AppointmentDetails({ searchParams }: {
    searchParams: {
        firstName: string,
        lastName: string,
    }
}) {
    const [appDetails, setAppDetails] = useState<Appointment>([] as any);

    const getAppDetails = useCallback(async () => {
        const res = await fetch(appointmentsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "firstName": searchParams.firstName,
                "lastName": searchParams.lastName,
            })
        });

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setAppDetails(data.body);
    }, [searchParams.firstName, searchParams.lastName]);

    useEffect(() => {
        getAppDetails();
    }, [getAppDetails]);

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Workplace</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{searchParams.firstName}</td>
                    <td>{searchParams.lastName}</td>
                    <td>{appDetails.email}</td>
                    <td>{appDetails.phone}</td>
                    <td>{appDetails.workplace}</td>
                </tr>
            </tbody>
        </table>
    );
}