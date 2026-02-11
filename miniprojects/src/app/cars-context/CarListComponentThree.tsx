import { useContext } from "react";
import { CarContext } from "./cars-context/carContext/CarContext";
import { Car } from "../../data/cars/Car"; // Make sure the Car type is correctly imported

export default function CarListComponentThree() {
    const usedCars = useContext(CarContext);

    // Check if usedCars is defined and has at least two items
    if (!usedCars || usedCars.length < 2) {
        return <div>No cars available.</div>;
    }

    return (
        <div>
            <p>Price: &pound;{usedCars[1].price}</p>
        </div>
    );
}
