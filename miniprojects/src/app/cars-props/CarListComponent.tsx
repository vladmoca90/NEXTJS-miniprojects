/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Car } from "../../data/cars/Car";

export interface CarListProps {
    car: Car;
}

export default function CarListComponent({ car }: CarListProps) {
    // Ensure price is treated as a number
    const price = typeof car.price === "string" ? parseFloat(car.price) : car.price;
    const monthlyPrice = (price / 12).toFixed(0);

    return (
        <div className="car-container">
            <div className="car-header">
                <h3 className="car-title">{car.make} <span>{car.model}</span></h3>
                <p className="car-price">
                    &pound;{price.toLocaleString()}
                    <span className="car-monthly-price"> from &pound;{monthlyPrice}/monthly</span>
                </p>
            </div>
            <div className="car-img-container">
                <img 
                    alt={`${car.make} ${car.model}`} 
                    className="car-img" 
                    src={car.img} 
                />
            </div>
            <div className="showroom-buttons">
                <Link href="/enquiry">Enquiry</Link>
                <Link href="/share">Share</Link>
                <Link href="/brochure">Brochure</Link>
                <Link 
                    href={{
                        pathname: "/car-props/car-details",
                        query: { carModel: car.model },
                    }}
                >
                    Full details
                </Link>
            </div>
        </div>
    );
}
