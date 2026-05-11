import { useContext } from "react";
import { CarContext } from "./carContext/CarContext";
import { Car } from "../../../data/cars/Car"; // Make sure the Car type is correctly imported

export default function CarListComponentThree() {
    const carContext = useContext(CarContext);

    // Check if carContext is defined and has at least two cars
    if (!carContext || !carContext.cars || carContext.cars.length < 2) {
        return <div>No cars available.</div>;
    }

    return (
        <div>
            <p>Price: &pound;{carContext.cars[1].price}</p>
        </div>
    );
}
