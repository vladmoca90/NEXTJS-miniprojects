import "./styles/appointment-details.css";
import { useCallback, useEffect, useState } from "react";
import { Appointment } from "../../../data/appointment/Appointment"; // Ensure Appointment type is defined correctly

const appointmentsUrl = "http://localhost:3000/api/appointment";

export default function AppointmentDetails({ searchParams }: {
    searchParams: {
        forename: string;
        surname: string;
        email: string;
        phone: string;
        workplace: string;
    };
}) {
    const [appDetails, setAppDetails] = useState<Appointment | null>(null);

    const getAppDetails = useCallback(async () => {
        try {
            const res = await fetch(appointmentsUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    forename: searchParams.forename,
                    surname: searchParams.surname,
                    email: searchParams.email,
                    phone: searchParams.phone,
                    workplace: searchParams.workplace,
                })
            });

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();
            setAppDetails(data.body); // Ensure this is structured correctly

        } catch (error) {
            console.error(error); // Log errors for easier debugging
        }
    }, [searchParams]);

    useEffect(() => {
        getAppDetails();
    }, [getAppDetails]);

    return (
        <div id="appointmentTable" className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">First name</th>
                        <th scope="col" className="px-6 py-3">Last name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Phone</th>
                        <th scope="col" className="px-6 py-3">Workplace</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{searchParams.forename}</td>
                        <td className="px-6 py-4">{searchParams.surname}</td>
                        <td className="px-6 py-4">{searchParams.email}</td>
                        <td className="px-6 py-4">{searchParams.phone}</td>
                        <td className="px-6 py-4">{searchParams.workplace}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
