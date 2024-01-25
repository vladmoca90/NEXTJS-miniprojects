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
    const [car, setCarDetails] = useState<Car[]>();

    const getCarDetails = useCallback(async () => {
        const res = await fetch(carsUrl, {
            method: "GET",
        });

        const data = await res.json();

        setCarDetails(data.body);
    }, []);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    return (
        <div>
            <p></p>
        </div>
    );
}