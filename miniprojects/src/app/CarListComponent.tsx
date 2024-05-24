/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Car } from "../../data/cars/Car";

export interface CarProps {
    car: Car;
}

export default function CarListComponent(props: CarProps) {
    const { car } = props;

    return (
        <div className="car-container">
            <div className="car-header">
                <h3 className="car-title">{props.car.make} <span>{props.car.model}</span></h3>
                <p className="car-price">&pound;{props.car.price}
                    <span className="car-monthly-price">from &pound;{(parseInt(props.car.price) / 12).toFixed(0)}/monthly</span>
                </p>
            </div>
            <div className="car-img-container">
                <img alt={props.car.make} className="car-img" src={props.car.img} />
            </div>
            <div className="showroom-buttons">
                <Link href="#">Enquiry</Link>
                <Link href="#">Share</Link>
                <Link href="#">Brochure</Link>
                <Link href={{
                    pathname: "/car-details",
                    query: {
                        "carModel": props.car.model,
                    },
                }}>Full details</Link>
            </div>
        </div>
    );
}