"use client";
import "./styles/wines.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Wine } from "../../data/wines/Wine";
import { WineContext } from "./wines-dropdown-context/wineContext/WineContext";
import FilteredWinesComponent from "./FilteredWinesComponent";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [query, setQuery] = useState<string>("");

    const getWines = useCallback(async () => {
        try {
            const res = await fetch(winesUrl);
            if (!res.ok) {
                throw new Error("The data is not valid!");
            }
            console.log("The data is valid!");

            const data = await res.json();
            setWines(data.body);
        } catch (error) {
            console.error(error);
        }
    }, [winesUrl]);

    const getSelectedWine = (e: ChangeEvent<HTMLSelectElement>) => {
        setQuery(e.target.value);
    };

    const filteredWines = useCallback(() => {
        return query === "All wines" || query.length === 0
            ? wines
            : wines.filter((wine) => wine.name.includes(query));
    }, [query, wines]);

    const onDeleteAWine = useCallback((deleteWine: Wine) => {
        setWines((prevWines) => prevWines.filter((wine) => wine.name !== deleteWine.name));
    }, []);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <div>
                <select id="productsList" title="wines" onChange={getSelectedWine}>
                    <option value="All wines">All wines</option>
                    {wines.map((wine, index) => (
                        <option key={index} value={wine.name}>{wine.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <div className="products-container">
                    <WineContext.Provider value={{ wines, setWines }}>
                        {filteredWines().map((wine, index) => (
                            <FilteredWinesComponent wine={wine} key={index} onDeletedWine={() => onDeleteAWine(wine)} />
                        ))}
                    </WineContext.Provider>
                </div>
            </div>
        </section>
    );
}
