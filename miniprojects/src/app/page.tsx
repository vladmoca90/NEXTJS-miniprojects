/* eslint-disable @next/next/no-img-element */
"use client";
import "./styles/cars-showroom.css";
import { useCallback, useEffect, useState } from "react";
import { Car } from "../../lib/carsShowroom/Car";

export default function CarsComponent() {
    let carsUrl = "http://localhost:3000/api/cars-showroom";

    const [cars, setCars] = useState<Car[]>([]);

    const getCars = useCallback(async () => {
        const res = await fetch(carsUrl);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        setCars(data.body);
    }, [carsUrl]);

    //A function that removes the duplicates from the array and display each value once in the dropdown
    const removeDuplicatedMakes = useCallback(() => {
        let carsDictionary: { [make: string[number]]: any } = {};

        for (let i = 0; i < cars.length; i++) {
            if (carsDictionary[cars[i].make]) {
                continue;
            }
            else {
                carsDictionary[cars[i].make] = cars;
            }
        }

        return Object.keys(carsDictionary);
    }, [cars]);

    useEffect(() => {
        getCars();
    }, [getCars]);

    return (
        <section className="box">
            <div className="showroom-search">
                <form>
                    <select id="carMake" title="carMake" className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                        <option value="make">-- Any Make --</option>
                        {
                            removeDuplicatedMakes().map((car, index) => {
                                return (
                                    <option value={car} key={index}>{car}</option>
                                );
                            })
                        }
                    </select>
                    <select id="carModel" title="carModel" disabled className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                        <option value="model">-- Any Model --</option>
                        {
                            cars.map((car, index) => {
                                return (
                                    <option value={car.model} key={index}>{car.model}</option>
                                );
                            })
                        }
                    </select>
                    <select id="carPrice" title="carPrice" className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                        <option value="price">-- Any Price --</option>
                        <option value="low">&pound;0 - &pound;4999</option>
                        <option value="medium">&pound;5000 - &pound;9999</option>
                        <option value="high">&pound;10000 - &pound;14999</option>
                    </select>
                </form>
            </div>
            <div className="showroom-container">
                {
                    cars.map((car, index) => {
                        return (
                            <div className="car-container" key={index}>
                                <div className="car-header">
                                    <h3 className="car-title">{car.make} <span>{car.model}</span></h3>
                                    <p className="car-price">&pound;{car.price}
                                        <span className="car-monthly-price">from &pound;{(car.price / 12).toFixed(0)}/monthly</span>
                                    </p>
                                </div>
                                <div className="car-img-container">
                                    <img alt={car.make} className="car-img" key={index} src={car.img} />
                                </div>
                                <div className="showroom-buttons">
                                    <a href="#">Enquiry</a>
                                    <a href="#">Share</a>
                                    <a href="#">Brochure</a>
                                    <a href="#">Full details</a>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}