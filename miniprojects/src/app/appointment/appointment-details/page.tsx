"use client";
import "../../styles/appointment-details.css";
import { useCallback, useEffect, useState, use } from "react";
import { Appointment } from "../../../../data/appointment/Appointment";

const appointmentsUrl = "http://localhost:3000/api/appointment";

export default function AppointmentDetails({ searchParams }: {
    searchParams: Promise<{
        forename: string,
        surname: string,
        email: string,
        phone: string,
        workplace: string,
    }>
}) {
    const params = use(searchParams);
    const [appDetails, setAppDetails] = useState<Appointment>([] as any);

    const getAppDetails = useCallback(async () => {
        const res = await fetch(appointmentsUrl, {
            method: "POST",
            body: JSON.stringify({
                "forename": params.forename,
                "surname": params.surname,
                "email": params.email,
                "phone": params.phone,
                "workplace": params.workplace,
            })
        });

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setAppDetails(data.body);
    }, [params.email, params.forename, params.phone, params.surname, params.workplace]);

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
                        <td className="px-6 py-4">{params.forename}</td>
                        <td className="px-6 py-4">{params.surname}</td>
                        <td className="px-6 py-4">{params.email}</td>
                        <td className="px-6 py-4">{params.phone}</td>
                        <td className="px-6 py-4">{params.workplace}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}