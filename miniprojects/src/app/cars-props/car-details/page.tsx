"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Car } from "../../../../data/cars/Car";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CarDetails() {

    const searchParams = useSearchParams();
    const carModel = searchParams.get("carModel");

    const modelsUrl = `http://localhost:3000/api/get-car-model?carModel=${carModel}`;

    const [carDetails, setCarDetails] = useState<Car | null>(null);

    const getCarDetails = useCallback(async () => {

        if (!carModel) return;

        try {
            const res = await fetch(modelsUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();
            setCarDetails(data.car);

        } catch (error) {
            console.error("Failed to fetch car details:", error);
        }

    }, [modelsUrl, carModel]);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    if (!carDetails) {
        return <div>Loading car details...</div>;
    }

    const price =
        typeof carDetails.price === "string"
            ? parseFloat(carDetails.price)
            : carDetails.price;

    const monthlyPrice = (price / 12).toFixed(0);

    return (
        <div id="showroom" className="car-details">
            <div className="car-container">

                <div className="car-header">
                    <h3 className="car-title">
                        {carDetails.make} <span>{carModel}</span>
                    </h3>

                    <p className="car-price">
                        &pound;{price.toLocaleString()}
                        <span className="car-monthly-price">
                            from &pound;{monthlyPrice}/monthly
                        </span>
                    </p>
                </div>

                <div className="car-img-container">
                    <img
                        alt={`${carDetails.make} ${carModel}`}
                        className="car-img"
                        src={carDetails.img}
                    />
                </div>

                <div className="showroom-buttons">
                    <Link href="/enquiry">Enquiry</Link>
                    <Link href="/share">Share</Link>
                    <Link href="/brochure">Brochure</Link>
                </div>

            </div>
        </div>
    );
}