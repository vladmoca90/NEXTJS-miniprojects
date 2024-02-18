/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Car } from "../../../lib/carsShowroom/Car";
import { useCallback, useEffect, useState } from "react";

export default function VehicleDetails({ searchParams }: {
    searchParams: {
        "carModel": string
    }
}) {
    let modelsUrl = "http://localhost:3000/api/get-car-model?carModel=" + searchParams.carModel;

    const [carDetails, setCarDetails] = useState<Car>([] as any);

    const getCarDetails = useCallback(async () => {
        const res = await fetch(modelsUrl);

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
        <div id="showroom">
            <div className="car-container">
                <div className="car-header">
                    <h3 className="car-title">{carDetails.make} <span>{searchParams.carModel}</span></h3>
                    <p className="car-price">&pound;{carDetails.price}
                        <span className="car-monthly-price">from &pound;{(carDetails.price / 12).toFixed(0)}/monthly</span>
                    </p>
                </div>
                <div className="car-img-container">
                    <img alt={carDetails.make} className="car-img" src={carDetails.img} />
                </div>
                <div className="showroom-buttons">
                    <Link href="#">Enquiry</Link>
                    <Link href="#">Share</Link>
                    <Link href="#">Brochure</Link>
                </div>
            </div>
        </div>
    );
}