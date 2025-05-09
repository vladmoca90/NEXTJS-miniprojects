"use client";
import "./styles/cars.css";
import { Car } from "../../data/cars/Car";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CarListComponent from "./CarListComponent";

export default function CarsShowroom() {
    const carsUrl = "http://localhost:3000/api/cars";

    const [cars, setCars] = useState<Car[]>([]);
    const [modelsFromMake, setModelsFromMake] = useState<Car[]>([]);
    const [query, setQuery] = useState("");

    const getCars = useCallback(async () => {
        try {
            const res = await fetch(carsUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            } else {
                console.log("The data is valid!");
            }

            const data = await res.json();
            setCars(data.body);
        } catch (error) {
            console.error("Failed to fetch cars:", error);
        }
    }, [carsUrl]);

    const removeDuplicatedMakes = useCallback(() => {
        const carsDictionary: { [make: string]: Car[] } = {};

        for (let car of cars) {
            if (!carsDictionary[car.make]) {
                carsDictionary[car.make] = []; // Initialize with an empty array
            }
            carsDictionary[car.make].push(car); // Store the car object in the array
        }

        return Object.keys(carsDictionary);
    }, [cars]);

    const getSelectedMake = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const carModels = cars.filter((car) => value === car.make);

        setModelsFromMake(carModels);
        setQuery(value);
    }, [cars]);

    const filterMakes = useCallback(() => {
        if (query === "" || query === "make") {
            return cars;
        } else {
            return cars.filter(car => car.make.includes(query));
        }
    }, [cars, query]);

    useEffect(() => {
        getCars();
    }, [getCars]);

    return (
        <div className="box">
            <div className="showroom-search">
                <form>
                    <select 
                        id="carMake" 
                        title="carMake" 
                        onChange={getSelectedMake}
                        className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    >
                        <option value="make">-- Any Make --</option>
                        {
                            removeDuplicatedMakes().map((make, index) => {
                                return (
                                    <option value={make} key={index}>{make}</option>
                                );
                            })
                        }
                    </select>
                    <select 
                        id="carModel" 
                        title="carModel" 
                        className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    >
                        <option value="model">-- Any Model --</option>
                        {
                            modelsFromMake.map((car, index) => {
                                return (
                                    <option value={car.model} key={index}>{car.model}</option>
                                );
                            })
                        }
                    </select>
                </form>
            </div>
            <div id="showroom">
                {
                    filterMakes().map((car, index) => {
                        return (
                            <CarListComponent car={car} key={index} />
                        );
                    })
                }
            </div>
        </div>
    );
}