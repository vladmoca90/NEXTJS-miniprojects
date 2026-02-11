"use client";
import "./styles/wines.css";
import { Wine } from "../../data/wines/Wine";
import { useCallback, useEffect, useState } from "react";
import FilteredWinesComponent from "./FilteredWinesComponent";

export default function WinesSellCheckboxes() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [checkedWine, setCheckedWine] = useState("");

    const getWines = useCallback(async () => {
        try {
            const res = await fetch(winesUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();
            setWines(data.body);
        } catch (error) {
            console.error(`The data is not valid: ${error}`);
        }
    }, [winesUrl]);

    const getCheckedWine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedWine(e.target.value);
    }, []);

    const filterCheckedWine = useCallback(() => {
        if (checkedWine === "All wines" || checkedWine === "") {
            return wines;
        } else {
            return wines.filter((wine) => wine.name.includes(checkedWine));
        }
    }, [checkedWine, wines]);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <div className="wines-checkboxes flex items-center">
                {/* All wines option */}
                <div className="flex items-center px-4 py-0 border border-gray-300 rounded dark:border-gray-700">
                    <input 
                        checked={checkedWine === "All wines"} 
                        onChange={getCheckedWine} 
                        id="all-wines-checkbox" 
                        type="radio" 
                        value="All wines" 
                        name="wine-selection" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                    />
                    <label 
                        htmlFor="all-wines-checkbox" 
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        All wines
                    </label>
                </div>

                {/* Individual wine options */}
                {wines.map((wine, index) => (
                    <div className="flex items-center px-4 py-0 border border-gray-300 rounded dark:border-gray-700" key={wine.name}>
                        <input 
                            checked={checkedWine === wine.name} 
                            onChange={getCheckedWine} 
                            id={`wine-checkbox-${index}`} 
                            type="radio" 
                            value={wine.name} 
                            name="wine-selection" 
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                        />
                        <label 
                            htmlFor={`wine-checkbox-${index}`} 
                            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {wine.name}
                        </label>
                    </div>
                ))}
            </div>

            {/* Filtered Wines Display */}
            <div className="products-container">
                {filterCheckedWine().map((wine) => (
                    <FilteredWinesComponent wine={wine} key={wine.name} />
                ))}
            </div>
        </section>
    );
}
