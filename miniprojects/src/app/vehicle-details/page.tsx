"use client";
import { useCallback, useEffect, useState } from "react";
import { Car } from "../../../lib/carsShowroom/Car";

let carsUrl = "http://localhost:3000/api/cars-showroom";

export default function VehicleDetails({ params }: {
    params: {
        "model": string,
        "make": string
    }
}) {
    const [carDetails, setCarDetails] = useState<Car[]>([] as any);

    const getCarDetails = useCallback(async () => {
        const res = await fetch(carsUrl);

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setCarDetails(data.body);
    }, []);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    return (
        <table>
            <thead>
                <th>Vehicle details of {params.model} {params.model}</th>
            </thead>
            <tbody>
                <tr>
                    <td>{params.model}</td>
                </tr>
                <tr>
                    <td>{params.make}</td>
                </tr>
                <tr>
                    <td>{car.price}</td>
                </tr>
                <tr>
                    <td>{carDetails.cars.p}</td>
                </tr>
            </tbody>
        </table>
    );
}