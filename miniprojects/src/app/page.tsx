/* eslint-disable @next/next/no-img-element */
"use client";
import "./styles/cars.css";
import { Car } from "../../data/cars/Car";
import { useCallback, useEffect, useState } from "react";
import VehicleComponent from "./VehicleComponent";

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
                            <VehicleComponent car={car} key={index} />
                        );
                    })
                }
            </div>
        </div>
    )
}