"use client";
import "./../styles/food-list.css";
import Image from "next/image";
import { Food } from "../../../lib/foodList/Food";
import { useCallback, useEffect, useState } from "react";

export default function FoodListDetails({ searchParams }: {
    searchParams: {
        "foodName": string,
    }
}) {
    let foodNameUrl = "http://localhost:3000/api/get-food?foodName=" + searchParams.foodName;

    const [foodDetails, setFoodDetails] = useState<Food>([] as any);

    const getFoodName = useCallback(async () => {
        const res = await fetch(foodNameUrl);

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setFoodDetails(data.food);
    }, [foodNameUrl]);

    useEffect(() => {
        getFoodName();
    }, [getFoodName]);

    return (
        <main className="main">
            <div className="container-table">
                <div className="flex flex-col">
                    <div className="overflow-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full border text-center text-sm font-medium">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="border-r px-3 py-2">Picture</th>
                                            <th scope="col" className="border-r px-3 py-2">Name</th>
                                            <th scope="col" className="border-r px-3 py-2">Price (&pound;)</th>
                                            <th scope="col" className="border-r px-3 py-2">Unit</th>
                                            <th scope="col" className="border-r px-3 py-2">Quantity</th>
                                            <th scope="col" className="border-r px-3 py-2">Total price (&pound;)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-r border-b dark:border-neutral-500 whitespace-nowrap px-3 py-2">
                                            <td className="food-image border-r border-r whitespace-nowrap px-3 py-2">
                                                <Image alt={foodDetails.name} className="product-img" width={100} height={100} src={"/images/foodList/" + foodDetails.img} />
                                            </td>
                                            <td className="food-name border-r border-r whitespace-nowrap px-3 py-2">{foodDetails.name}</td>
                                            <td className="food-price border-r border-r whitespace-nowrap px-3 py-2">{foodDetails.price}</td>
                                            <td className="food-unit border-r border-r whitespace-nowrap px-3 py-2">{foodDetails.unit}</td>
                                            <td className="food-quantity border-r whitespace-nowrap px-3 py-2">{foodDetails.quantity}</td>
                                            <td className="food-total-price border-r whitespace-nowrap px-3 py-2">{(foodDetails.price * foodDetails.quantity).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
