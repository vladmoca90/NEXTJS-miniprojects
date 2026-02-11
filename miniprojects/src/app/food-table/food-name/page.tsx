"use client";
import "./../styles/food-list.css";
import Image from "next/image";
import { Food } from "../../../../data/foodList/Food";
import { useCallback, useEffect, useState } from "react";

export default function FoodListDetails({ searchParams }: {
    searchParams: {
        foodName: string;
    };
}) {
    const foodNameUrl = `http://localhost:3000/api/get-food?foodName=${searchParams.foodName}`;

    const [foodDetails, setFoodDetails] = useState<Food | null>(null); // Changed to allow null

    const getFoodName = useCallback(async () => {
        try {
            const res = await fetch(foodNameUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();
            setFoodDetails(data.food);
        } catch (error) {
            console.error(error); // Log the error
            setFoodDetails(null); // Set to null in case of error
        }
    }, [foodNameUrl]);

    useEffect(() => {
        getFoodName();
    }, [getFoodName]);

    // Conditional rendering while data is loading or if there's an error
    if (!foodDetails) {
        return <div>Loading...</div>; // or a better loading/error message
    }

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
                                                <Image alt={foodDetails.name} className="product-img" width={90} height={90} src={`/images/foodList/${foodDetails.img}`} />
                                            </td>
                                            <td className="food-name border-r border-r whitespace-nowrap px-3 py-2">{foodDetails.name}</td>
                                            <td className="food-price border-r border-r whitespace-nowrap px-3 py-2">{foodDetails.price.toFixed(2)}</td>
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
