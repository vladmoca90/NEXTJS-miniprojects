"use client";
import "./../styles/appointment-details.css";
import { useCallback, useEffect, useState } from "react";
import { Appointment } from "../../../lib/appointment/Appointment";

const appointmentsUrl = "http://localhost:3000/api/appointment";

export default function AppointmentDetails({ searchParams }: {
    searchParams: {
        forename: string,
        surname: string,
    }
}) {
    const [appDetails, setAppDetails] = useState<Appointment>([] as any);

    const getAppDetails = useCallback(async () => {
        const res = await fetch(appointmentsUrl, {
            method: "POST",
            body: JSON.stringify({
                "forename": searchParams.forename,
                "surname": searchParams.surname,
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
    }, [searchParams.forename, searchParams.surname]);

    useEffect(() => {
        getAppDetails();
    }, [getAppDetails]);

    return (
        <div id="appointmentTable" className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" className="px-6 py-3">First name</th>
                    <th scope="col" className="px-6 py-3">Last name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Phone</th>
                    <th scope="col" className="px-6 py-3">Workplace</th>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{searchParams.forename}</td>
                        <td className="px-6 py-4">{searchParams.surname}</td>
                        <td className="px-6 py-4">{appDetails.email}</td>
                        <td className="px-6 py-4">{appDetails.phone}</td>
                        <td className="px-6 py-4">{appDetails.workplace}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}