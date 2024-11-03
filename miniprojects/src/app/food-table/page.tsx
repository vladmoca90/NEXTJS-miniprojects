"use client";
import "./styles/food-list.css";
import { Food } from "../../data/foodList/Food"; // Ensure Food is correctly defined
import { useState, useCallback, useEffect, useMemo } from "react";
import FoodListComponent from "./FoodListComponent";

export default function FoodList() {
    const foodsUrl = "http://localhost:3000/api/food-list";

    const [foods, setFoods] = useState<Food[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState<string | null>(null); // Track error state

    const getFoods = useCallback(async () => {
        setLoading(true); // Set loading state to true
        
        try {
            const res = await fetch(foodsUrl);
            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();
            setFoods(data.body || []); // Safeguard against undefined
        } catch (error) {
            console.error("Error fetching foods:", error);
            setError("Failed to fetch food data."); // Set error message
        } finally {
            setLoading(false); // Set loading state to false
        }
    }, [foodsUrl]);

    // Function that calculates the total price
    const calculateTotalPrice = () => {
        return foods.reduce((sum, food) => sum + food.price * food.quantity, 0);
    };

    // Function that calculates the average price of all items combined
    const calculateAveragePrice = () => {
        if (foods.length === 0) return 0;
        const total = calculateTotalPrice();
        return total / foods.length;
    };

    // Function that returns the highest price of an item
    const getMostExpensiveItem = () => {
        return Math.max(...foods.map(food => food.price), 0);
    };

    // Function that returns the smallest price of an item
    const getCheapestItem = () => {
        return Math.min(...foods.map(food => food.price), Infinity);
    };

    // Function that returns the most common unit of measurement
    const getMostCommonUnit = () => {
        const unitCount: { [unit: string]: number } = {};
        let maxUnit: string | undefined;
        let maxCount = 0;

        foods.forEach(food => {
            unitCount[food.unit] = (unitCount[food.unit] || 0) + 1;
        });

        for (const [unit, count] of Object.entries(unitCount)) {
            if (count > maxCount) {
                maxCount = count;
                maxUnit = unit;
            }
        }

        return maxUnit;
    };

    const getFilteredFood = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value.toLowerCase()); // Lowercase for easier comparison
    };

    const filteredFood = useMemo(() => {
        if (!query) {
            return foods;
        }
        return foods.filter(food => {
            return (
                food.name.toLowerCase().includes(query) ||
                food.unit.toLowerCase().includes(query) ||
                food.price.toString().includes(query) ||
                food.quantity.toString().includes(query)
            );
        });
    }, [query, foods]);

    useEffect(() => {
        getFoods();
    }, [getFoods]);

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>{error}</div>; // Show error state

    return (
        <main className="main">
            <div id="foodSearch">
                <label className="food-search-title">Search food:</label>
                <input 
                    onChange={getFilteredFood} 
                    value={query} 
                    className="food-search-bar" 
                    title="search" 
                    name="search" 
                    type="text" 
                    placeholder="Search food..." 
                />
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
                                            filteredFood.map((food) => {
                                                return (
                                                    <FoodListComponent food={food} key={food.id} /> // Ensure `id` is unique
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
                                <td className="border-r whitespace-nowrap px-6 py-4">&pound;{getCheapestItem().toFixed(2)}</td>
                                <td className="border-r whitespace-nowrap px-6 py-4">&pound;{getMostExpensiveItem().toFixed(2)}</td>
                                <td className="border-r whitespace-nowrap px-6 py-4">{getMostCommonUnit()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
