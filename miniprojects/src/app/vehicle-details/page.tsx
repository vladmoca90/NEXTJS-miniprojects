"use client";
import { useCallback, useEffect, useState } from "react";
import { Car } from "../../../lib/carsShowroom/Car";

export default function VehicleDetails({ searchParams }: {
    searchParams: {
        "carModel": string
    }
}) {

    let modelsUrl = "http://localhost:3000/api/get-car-model?carModel=" + searchParams.carModel;

    const [carDetails, setCarDetails] = useState<Car>([] as any);

    const getCarDetails = useCallback(async () => {
        const res = await fetch(modelsUrl, {
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
    }, [modelsUrl]);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    return (
        <div>
            <h3>Vehicle details of {searchParams.carModel}</h3>
            <p>{carDetails.img}</p>
            <p>{carDetails.make}</p>
            <p>{searchParams.carModel}</p>
            <p>{carDetails.price}</p>
        </div>
    );
}