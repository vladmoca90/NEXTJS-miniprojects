"use client";
import { useCallback, useEffect, useState } from "react";
import { Car } from "../../../lib/carsShowroom/Car";

export default function VehicleDetails({ params }: {
    params: {
        "model": string
    }
}) {

    let modelUrl = "http://localhost:3000/api/get-car-model?model=" + params.model;

    const [carDetails, setCarDetails] = useState<Car>([] as any);

    const getCarDetails = useCallback(async () => {
        const res = await fetch(modelUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setCarDetails(data.car);
    }, [modelUrl]);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    return (
        <table>
            <thead>
                <th>Vehicle details of {params.model}</th>
            </thead>
            <tbody>
                <tr>
                    <td>{carDetails.img}</td>
                </tr>
                <tr>
                    <td>{carDetails.make}</td>
                </tr>
                <tr>
                    <td>{params.model}</td>
                </tr>
                <tr>
                    <td>{carDetails.price}</td>
                </tr>
            </tbody>
        </table>
    );
}