"use client";
import "./styles/food-list.css";
import { Food } from "../../data/foodList/Food";
import { useState, useCallback, useEffect } from "react";
import FoodListComponent from "./FoodListComponent";

export default function FoodList() {
    const foodsUrl = "http://localhost:3000/api/food-list";

    const [foods, setFoods] = useState<Food[]>([]);
    const [query, setQuery] = useState("");

    const getFoods = useCallback(async () => {
        const res = await fetch(foodsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setFoods(data.body);
    }, [foodsUrl]);

    //A function that calculates the total price
    const calculateTotalPrice = useCallback(() => {
        let sum = 0;

        for (let i in foods) {
            sum += (foods[i].price) * (foods[i].quantity);
        }

        return sum;
    }, [foods]);

    //A function that calculates the average price of all items combined
    const calculateAveragePrice = useCallback(() => {
        let average = 0;

        for (let i in foods) {
            average += (foods[i].price * foods[i].quantity) / (foods.length);
        }

        return average;
    }, [foods]);

    //A function that returns the highest price of an item
    const getMostExpensiveItem = useCallback(() => {
        let expensive = 0;

        for (let i in foods) {
            if (foods[i].price > expensive) {
                expensive = foods[i].price;
            }
        }

        return expensive;
    }, [foods]);

    // A function that returns the smallest price of an item
    const getCheapestItem = useCallback(() => {
        const mostExpensive = getMostExpensiveItem();
        let cheapest = mostExpensive;

        for (let i in foods) {
            if (foods[i].price < cheapest) {
                cheapest = foods[i].price;
            }
        }

        return cheapest;
    }, [foods, getMostExpensiveItem]);

    // A function the returns the most common unit of measurement
    const getMostCommonUnit = useCallback(() => {
        let unitCount: { [unit: string]: number } = {};
        let maxUnit: string | undefined;
        let maxCount: number | undefined;

        for (let food of foods) {
            if (unitCount[food.unit]) {
                unitCount[food.unit] += 1;
            } else {
                unitCount[food.unit] = 1;
            }
        }

        for (const [unit, count] of Object.entries(unitCount)) {
            if (!maxCount) {
                maxCount = count;
                maxUnit = unit;
            } else {
                if (count > maxCount) {
                    maxCount = count;
                    maxUnit = unit;
                }
            }
        }

        return maxUnit;
    }, [foods]);

    const getFilteredFood = useCallback(async (e: { target: { value: string } }) => {
        setQuery(e.target.value);
    }, []);

    const filteredFood = useCallback(() => {
        if (query.length === 0) {
            return foods;
        } else {
            return foods.filter(foods =>
                foods.name.toLowerCase().includes(query) ||
                foods.name.toUpperCase().includes(query) ||
                foods.unit.toLowerCase().includes(query) ||
                foods.unit.toUpperCase().includes(query) ||
                foods.price.toString().toLowerCase().includes(query) ||
                foods.quantity.toString().toUpperCase().includes(query));
        }
    }, [foods, query]);

    useEffect(() => {
        getFoods();
    }, [getFoods]);

    return (
        <main className="main">
            <div id="foodSearch">
                <label className="food-search-title">Search food:</label>
                <input onChange={getFilteredFood} value={query} className="food-search-bar" title="search" name="search" type="text" placeholder="Search food..." />
            </div>
            <div className="container-table">
                <div className="flex flex-col">
                    <div className="overflow-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full border text-center text-sm font-medium">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="border-r px-6 py-4">Picture</th>
                                            <th scope="col" className="border-r px-6 py-4">Name</th>
                                            <th scope="col" className="border-r px-6 py-4">Price (&pound;)</th>
                                            <th scope="col" className="border-r px-6 py-4">Unit</th>
                                            <th scope="col" className="border-r px-6 py-4">Quantity</th>
                                            <th scope="col" className="border-r px-6 py-4">Total price (&pound;)</th>
                                            <th scope="col" className="border-r px-6 py-4">Check food details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredFood().map((food, index) => {
                                                return (
                                                    <FoodListComponent food={food} key={index} />
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-calculus">
                    <table className="min-w-full border text-center text-sm font-medium">
                        <thead className="border-b font-medium">
                            <tr>
                                <th scope="col" className="border-r px-6 py-4">Total amount to pay (&pound;)</th>
                                <th scope="col" className="border-r px-6 py-4">Total number of items</th>
                                <th scope="col" className="border-r px-6 py-4">Average price of items (&pound;)</th>
                                <th scope="col" className="border-r px-6 py-4">Cheapest item (&pound;)</th>
                                <th scope="col" className="border-r px-6 py-4">Most expensive item (&pound;)</th>
                                <th scope="col" className="border-r px-6 py-4">Most common unit</th>
                            </tr>
                        </thead>
                        <tbody className="table-content table-content-calculus">
                            <tr className="border-b dark:border-neutral-500">
                                <td className="border-r whitespace-nowrap px-6 py-4">&pound;{calculateTotalPrice().toFixed(2)}</td>
                                <td className="border-r whitespace-nowrap px-6 py-4">{foods.length}</td>
                                <td className="border-r whitespace-nowrap px-6 py-4">&pound;{calculateAveragePrice().toFixed(2)}</td>
                                <td className="border-r whitespace-nowrap px-6 py-4">&pound;{getCheapestItem()}</td>
                                <td className="border-r whitespace-nowrap px-6 py-4">&pound;{getMostExpensiveItem()}</td>
                                <td className="border-r whitespace-nowrap px-6 py-4">{getMostCommonUnit()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}