"use client";
import { useCallback, useEffect, useState } from "react";
import { Car } from "../../../lib/carsShowroom/Car";

export default function VehicleDetails({ params }: {
    params: {
        "model": string
    }
}) {

    let carsUrl = "http://localhost:3000/api/cars-showroom?carModel=" + params.model;

    const [carDetails, setCarDetails] = useState<Car[]>();

    const getCarDetails = useCallback(async () => {
        const res = await fetch(carsUrl);

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setCarDetails(data.car);
    }, [carsUrl]);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    return (
        <table>
            <thead>
                <th>Vehicle details of {params.model}</th>
            </thead>
            <tbody>
                {/* <tr>
                    <td>{carDetails.car.make}</td>
                </tr> */}
                <tr>
                    <td>{params.model}</td>
                </tr>
                {/* <tr>
                    <td>{car.price}</td>
                </tr>
                <tr>
                    <td>{carDetails.car}</td>
                </tr> */}
            </tbody>
        </table>
    );
}