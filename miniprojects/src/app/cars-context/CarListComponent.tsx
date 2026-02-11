/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Car } from "../../data/cars/Car";

export interface CarProps {
    car: Car;
}

export default function CarListComponent({ car }: CarProps) {
    const monthlyPrice = (parseInt(car.price) / 12).toFixed(0);

    return (
        <div className="car-container">
            <div className="car-header">
                <h3 className="car-title">
                    {car.make} <span>{car.model}</span>
                </h3>
                <p className="car-price">
                    &pound;{car.price}
                    <span className="car-monthly-price"> from &pound;{monthlyPrice}/monthly</span>
                </p>
            </div>
            <div className="car-img-container">
                <img alt={`${car.make} ${car.model}`} className="car-img" src={car.img} />
            </div>
            <div className="showroom-buttons">
                <Link href="#">Enquiry</Link>
                <Link href="#">Share</Link>
                <Link href="#">Brochure</Link>
                <Link href={{
                    pathname: "/car-details",
                    query: { carModel: car.model },
                }}>
                    Full details
                </Link>
            </div>
        </div>
    );
}
