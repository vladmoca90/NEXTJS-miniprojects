"use client";
import "../styles/food-list.css";
import FoodListComponent from "./food-table/FoodListComponent";
import { allFoods } from "../../data/foodTable/allFoods";

export default function FoodTablePage() {
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
                                            <th scope="col" className="border-r px-6 py-4">Image</th>
                                            <th scope="col" className="border-r px-6 py-4">Name</th>
                                            <th scope="col" className="border-r px-6 py-4">Price</th>
                                            <th scope="col" className="border-r px-6 py-4">Unit</th>
                                            <th scope="col" className="border-r px-6 py-4">Quantity</th>
                                            <th scope="col" className="border-r px-6 py-4">Total Price</th>
                                            <th scope="col" className="px-6 py-4">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allFoods.map((food) => (
                                            <FoodListComponent key={food.id} food={food} />
                                        ))}
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