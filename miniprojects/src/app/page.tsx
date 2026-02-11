"use client";
import "./styles/wines.css";
import { ChangeEvent, useCallback, useEffect, useState, useMemo } from "react";
import { Wine } from "./../../data/wines/Wine";
import FilteredWinesComponent from "./FilteredWinesComponent";
import { WineContext } from "./wines-dropdown-context/wineContext/WineContext";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [allWines, setAllWines] = useState<Wine[]>([]); // Store original list
    const [filteredWines, setFilteredWines] = useState<Wine[]>([]); // Track filtered wines
    const [query, setQuery] = useState("");

    const getWines = useCallback(async () => {
        try {
            const res = await fetch(winesUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();

            setAllWines(data.body);
            setFilteredWines(data.body); // Initialize both states
        } catch (error) {
            console.error("Error fetching wines:", error);
        }
    }, [winesUrl]);

    const getSelectedWine = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const selectedWine = e.target.value;
        setQuery(selectedWine);

        if (selectedWine === "All wines") {
            setFilteredWines(allWines); // Reset to full list when "All wines" is selected
        } else {
            setFilteredWines(allWines.filter(wine => wine.name.includes(selectedWine)));
        }
    }, [allWines]);

    const onDeleteAWine = useCallback((deleteWine: Wine) => {
        setFilteredWines(prev => prev.filter(wine => wine.name !== deleteWine.name));
    }, []);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <div>
                <select id="productsList" title="wines" onChange={getSelectedWine}>
                    <option value="All wines">All wines</option>
                    {allWines.map((wine, index) => (
                        <option key={index} value={wine.name}>{wine.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <div className="products-container">
                    <WineContext.Provider value={filteredWines}>
                        {filteredWines.map((wine, index) => (
                            <FilteredWinesComponent
                                wine={wine}
                                key={index}
                                onDeletedWine={() => onDeleteAWine(wine)}
                            />
                        ))}
                    </WineContext.Provider>
                </div>
            </div>
        </section>
    );
}
