"use client";
import { useCallback, useEffect, useState } from "react";
import "./../styles/appointment-details.css";
import { Appointment } from "../../../lib/appointment/Appointment";

export default function AppointmentDetails({ searchParams }: {
    searchParams: {
        "firstName": string,
        "lastName": string,
        "email": string,
        "password": string,
        "phone": string,
        "workplace": string,
    }
}) {
    let appointmentsUrl = "http://localhost:3000/api/appointment";

    const [appDetails, setAppDetails] = useState<Appointment>([] as any);

    const getAppDetails = useCallback(async () => {
        await fetch(appointmentsUrl, {
            method: "POST",
            body: JSON.stringify({
                "firstName": searchParams.firstName,
                "lastName": searchParams.lastName,
                "email": searchParams.email,
                "password": searchParams.password,
                "phone": searchParams.phone,
                "workplace": searchParams.workplace,
            })
        });
    }, [appointmentsUrl, searchParams.email, searchParams.firstName, searchParams.lastName, searchParams.password, searchParams.phone, searchParams.workplace]);

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
                    <th>Password</th>
                    <th>Phone</th>
                    <th>Workplace</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{appDetails.firstName}</td>
                    <td>{appDetails.lastName}</td>
                    <td>{appDetails.email}</td>
                    <td>{appDetails.password}</td>
                    <td>{appDetails.phone}</td>
                    <td>{appDetails.workplace}</td>
                </tr>
            </tbody>
        </table>
    );
}