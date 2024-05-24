import { useContext } from "react";
import { CarContext } from "./cars-context/carContext/CarContext";

export default function CarListComponentThree() {
    const usedCar = useContext(CarContext);
    
    return (
        <div>{usedCar[3].price}</div>
    );
}