import Image from "next/image";
import Link from "next/link";
import { Food } from "../../data/foodList/Food";

export interface FoodListProps {
    food: Food;
}

export default function FoodListComponent({ food }: FoodListProps) {
    const totalPrice = (food.price * food.quantity).toFixed(2);

    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="food-image border-r whitespace-nowrap px-6 py-4">
                <Image 
                    alt={`Image of ${food.name}`} 
                    className="product-img" 
                    width={90} 
                    height={90} 
                    src={`/images/foodList/${food.img}`} 
                />
            </td>
            <td className="food-name border-r whitespace-nowrap px-6 py-4">{food.name}</td>
            <td className="food-price border-r whitespace-nowrap px-6 py-4">{food.price.toFixed(2)}</td>
            <td className="food-unit border-r whitespace-nowrap px-6 py-4">{food.unit}</td>
            <td className="food-quantity border-r whitespace-nowrap px-6 py-4">{food.quantity}</td>
            <td className="food-total-price border-r whitespace-nowrap px-6 py-4">{totalPrice}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <Link 
                    className="food-details" 
                    href={{ pathname: "/food-name", query: { foodName: food.name } }}
                >
                    Check details
                </Link>
            </td>
        </tr>
    );
}
