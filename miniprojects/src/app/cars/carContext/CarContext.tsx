import { createContext, useContext } from "react";
import { Car } from "../../../../data/cars/Car";

export const carContext = createContext<Car | undefined>(undefined);

export default function useCarContext() {
    const carRepository = useContext(carContext);

    if(carRepository === undefined) {
        throw new Error("The car context cannot be undefined.");
    }

    return carRepository;
}