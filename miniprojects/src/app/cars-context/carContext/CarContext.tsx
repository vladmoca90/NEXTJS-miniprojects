import { createContext } from "react";
import { Car } from "../../../../data/cars/Car";

export const CarContext = createContext<Car[]>([]);