/* eslint-disable @next/next/no-img-element */
"use client";
import "./styles/cars.css";
import Link from "next/link";
import { Car } from "../../lib/cars/Car";
import { useCallback, useEffect, useState } from "react";

export default function CarsShowroom() {
    let carsUrl = "http://localhost:3000/api/cars";

    const [cars, setCars] = useState<Car[]>([]);
    const [modelsFromMake, setModelsFromMake] = useState<Car[]>([]);
    const [pricesForModels, setPricesForModels] = useState<Car[]>([]);
    //const [query, setQuery] = useState("");

    const getCars = useCallback(async () => {
        const res = await fetch(carsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setCars(data.body);
    }, [carsUrl]);

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

    const selectMake = useCallback(async (e: { target: { value: string; } }) => {
        const value = e.target.value;
        const carModels = cars.filter((car) => value === car.make);

        setModelsFromMake(carModels);
    }, [cars]);

    const getPriceForModel = useCallback(async (e: { target: { value: string; } }) => {
        const value = e.target.value;
        const priceModels = cars.filter((car) => value === car.model);

        setPricesForModels(priceModels);
    }, [cars]);

    // const getFilteredCars = useCallback(async (e: { target: { value: string } }) => {
    //     const value = e.target.value;
    //     setQuery(value);
    // }, []);

    // const filteredCars = useCallback(() => {
    //     return cars.filter(cars =>
    //         cars.make.toLowerCase().includes(query) ||
    //         cars.model.toLowerCase().includes(query) ||
    //         cars.price.toLowerCase().includes(query)
    //     );
    // }, [cars, query]);

    return (
        <div className="box">
            <div className="showroom-search">
                <form>
                    <select id="carMake" title="carMake" onChange={selectMake}
                        className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                        <option value="make">-- Any Make --</option>
                        {
                            removeDuplicatedMakes().map((car, index) => {
                                return (
                                    <option value={car} key={index}>{car}</option>
                                );
                            })
                        }
                    </select>
                    <select id="carModel" title="carModel" onChange={getPriceForModel}
                        className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                        <option value="model">-- Any Model --</option>
                        {
                            modelsFromMake.map((car, index) => {
                                return (
                                    <option value={car.model} key={index}>{car.model}</option>
                                );
                            })
                        }
                    </select>
                    <select id="carPrice" title="carPrice" className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                        <option value="price">-- Any Price --</option>
                        {
                            pricesForModels.map((car, index) => {
                                return (
                                    <option value={car.price} key={index}>&pound;{car.price}</option>
                                );
                            })
                        }
                    </select>
                    <button className="search-btn">Search</button>
                </form>
            </div>
            <div id="showroom">
                {
                    cars.map((car, index) => {
                        return (
                            <div className="car-container" key={index}>
                                <div className="car-header">
                                    <h3 className="car-title">{car.make} <span>{car.model}</span></h3>
                                    <p className="car-price">&pound;{car.price}
                                        <span className="car-monthly-price">from &pound;{(parseInt(car.price) / 12).toFixed(0)}/monthly</span>
                                    </p>
                                </div>
                                <div className="car-img-container">
                                    <img alt={car.make} className="car-img" key={index} src={car.img} />
                                </div>
                                <div className="showroom-buttons">
                                    <Link href="#">Enquiry</Link>
                                    <Link href="#">Share</Link>
                                    <Link href="#">Brochure</Link>
                                    <Link href={{
                                        pathname: "/vehicle-details",
                                        query: {
                                            "carModel": car.model,
                                        },
                                    }}>Full details</Link>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}