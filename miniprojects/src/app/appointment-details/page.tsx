"use client";
import { useCallback, useEffect, useState } from "react";
import "./../styles/appointment-details.css";
import { Appointment } from "../../../lib/appointment/Appointment";

const appointmentsUrl = "http://localhost:3000/api/appointment";

export default function AppointmentDetails({ searchParams }: {
    searchParams: {
        "firstName": string,
        "lastName": string,
        "email": string,
        "phone": string,
        "workplace": string,
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
                "email": searchParams.email,
                "phone": searchParams.phone,
                "workplace": searchParams.workplace,
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
    }, [searchParams.email, searchParams.firstName, searchParams.lastName, searchParams.phone, searchParams.workplace]);

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
                    <td>{appDetails.firstName}</td>
                    <td>{appDetails.lastName}</td>
                    <td>{appDetails.email}</td>
                    <td>{appDetails.phone}</td>
                    <td>{appDetails.workplace}</td>
                </tr>
            </tbody>
        </table>
    );
}