"use client";
import "./styles/wines.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Wine } from "../../../data/wines/Wine";
import FilteredWinesComponent from "./FilteredWinesComponent";
import { WineContext } from "./wineContext/WineContext";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [allWines, setAllWines] = useState<Wine[]>([]);
    const [filteredWines, setFilteredWines] = useState<Wine[]>([]);

    const getWines = useCallback(async () => {
        try {
            const res = await fetch(winesUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();

            setAllWines(data.body);
            setFilteredWines(data.body);
        } catch (error) {
            console.error("Error fetching wines:", error);
        }
    }, [winesUrl]);

    const getSelectedWine = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const selectedWine = e.target.value;

        if (selectedWine === "All wines") {
            setFilteredWines(allWines);
        } else {
            setFilteredWines(
                allWines.filter(wine => wine.name.includes(selectedWine))
            );
        }
    }, [allWines]);

    const onDeleteAWine = useCallback((deleteWine: Wine) => {
        setFilteredWines(prev =>
            prev.filter(wine => wine.index !== deleteWine.index)
        );
    }, []);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <div>
                <select id="productsList" title="wines" onChange={getSelectedWine}>
                    <option value="All wines">All wines</option>
                    {allWines.map((wine) => (
                        <option key={wine.index} value={wine.name}>
                            {wine.name}
                        </option>
                    ))}
                </select>
            </div>

            <WineContext.Provider value={{ wines: filteredWines, setWines: setFilteredWines }}>
                <div className="products-container">
                    {filteredWines.map((wine) => (
                        <FilteredWinesComponent
                            wine={wine}
                            key={wine.index}
                            onDeletedWine={() => onDeleteAWine(wine)}
                        />
                    ))}
                </div>
            </WineContext.Provider>
        </section>
    );
}