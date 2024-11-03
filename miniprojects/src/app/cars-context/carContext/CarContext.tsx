import { createContext } from "react";
import { Car } from "../../../../data/cars/Car";

interface CarContextType {
    cars: Car[]; // You can add more properties or methods related to car management here
}

export const CarContext = createContext<CarContextType | undefined>(undefined);
