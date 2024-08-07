/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Car } from "../../data/cars/Car";

export interface CarListProps {
    car: Car;
}

export default function CarListComponent(props: CarListProps) {
    const { car } = props;

    return (
        <div className="car-container">
            <div className="car-header">
                <h3 className="car-title">{car.make} <span>{car.model}</span></h3>
                <p className="car-price">&pound;{car.price}
                    <span className="car-monthly-price">from &pound;{(parseInt(car.price) / 12).toFixed(0)}/monthly</span>
                </p>
            </div>
            <div className="car-img-container">
                <img alt={car.make} className="car-img" src={car.img} />
            </div>
            <div className="showroom-buttons">
                <Link href="#">Enquiry</Link>
                <Link href="#">Share</Link>
                <Link href="#">Brochure</Link>
                <Link href={{
                    pathname: "/car-details",
                    query: {
                        "carModel": car.model,
                    },
                }}>Full details</Link>
            </div>
        </div>
    );
}