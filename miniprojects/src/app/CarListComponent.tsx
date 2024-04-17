/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import useCarContext from "./cars/carContext/CarContext";

export default function CarListComponent() {
    const useCar = useCarContext();

    return (
        <div className="car-container">
            <div className="car-header">
                <h3 className="car-title">{useCar.make} <span>{useCar.model}</span></h3>
                <p className="car-price">&pound;{useCar.price}
                    <span className="car-monthly-price">from &pound;{(parseInt(useCar.price) / 12).toFixed(0)}/monthly</span>
                </p>
            </div>
            <div className="car-img-container">
                <img alt={useCar.make} className="car-img" src={useCar.img} />
            </div>
            <div className="showroom-buttons">
                <Link href="#">Enquiry</Link>
                <Link href="#">Share</Link>
                <Link href="#">Brochure</Link>
                <Link href={{
                    pathname: "/car-details",
                    query: {
                        "carModel": useCar.model,
                    },
                }}>Full details</Link>
            </div>
        </div>
    );
}