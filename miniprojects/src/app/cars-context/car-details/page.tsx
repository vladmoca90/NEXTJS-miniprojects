/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Car } from "../../../data/cars/Car";
import { useCallback, useEffect, useState } from "react";

export default function CarDetails({ searchParams }: { searchParams: { carModel: string } }) {
    const modelsUrl = `http://localhost:3000/api/get-car-model?carModel=${searchParams.carModel}`;
    
    const [carDetails, setCarDetails] = useState<Car | null>(null); // Initialize as null for type safety

    const getCarDetails = useCallback(async () => {
        try {
            const res = await fetch(modelsUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            } else {
                console.log("The data is valid!");
            }

            const data = await res.json();
            setCarDetails(data.car);
        } catch (error) {
            console.error("Failed to fetch car details:", error);
        }
    }, [modelsUrl]);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    // Render loading state or error if carDetails is not ready
    if (!carDetails) {
        return <div>Loading car details...</div>; // Optional: replace with a spinner or similar
    }

    const price = typeof carDetails.price === "string" ? parseFloat(carDetails.price) : carDetails.price;
    const monthlyPrice = (price / 12).toFixed(0);

    return (
        <div id="showroom" className="car-details">
            <div className="car-container">
                <div className="car-header">
                    <h3 className="car-title">{carDetails.make} <span>{searchParams.carModel}</span></h3>
                    <p className="car-price">
                        &pound;{price.toLocaleString()}
                        <span className="car-monthly-price"> from &pound;{monthlyPrice}/monthly</span>
                    </p>
                </div>
                <div className="car-img-container">
                    <img 
                        alt={`${carDetails.make} ${searchParams.carModel}`} 
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
