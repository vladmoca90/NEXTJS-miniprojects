import { createContext, useContext } from "react";
import { Car } from "../../../../data/cars/Car";

export const CarContext = createContext<Car | undefined>(undefined);

export function useCarContext() {
    const carRepository = useContext(CarContext);

    if(carRepository === undefined) {
        throw new Error("The car context cannot be undefined.");
    }

    return carRepository;
}