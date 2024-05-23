import Image from "next/image";
import Link from "next/link";
import { Food } from "../../data/foodList/Food";

export interface FoodListProps {
    food: Food,
}

export default function FoodListComponent(props: FoodListProps) {
    const {food} = props;

    return (
        <tr className="border-r border-b dark:border-neutral-500 whitespace-nowrap px-6 py-4">
            <td className="food-image border-r border-r whitespace-nowrap px-6 py-4">
                <Image alt={props.food.name} className="product-img" width={90} height={90} src={"/images/foodList/" + props.food.img} />
            </td>
            <td className="food-name border-r border-r whitespace-nowrap px-6 py-4">{props.food.name}</td>
            <td className="food-price border-r border-r whitespace-nowrap px-6 py-4">{props.food.price}</td>
            <td className="food-unit border-r border-r whitespace-nowrap px-6 py-4">{props.food.unit}</td>
            <td className="food-quantity border-r whitespace-nowrap px-6 py-4">{props.food.quantity}</td>
            <td className="food-total-price border-r whitespace-nowrap px-6 py-4">{(props.food.price * props.food.quantity).toFixed(2)}</td>
            <td className="food-total-price border-r whitespace-nowrap px-6 py-4">
                <Link className="food-details" href={{
                    pathname: "/food-name",
                    query: {
                        "foodName": props.food.name
                    }
                }}>Check details</Link>
            </td>
        </tr>
    );
}