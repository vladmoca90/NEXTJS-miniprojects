import "./styles/wines.css";
import { ChangeEvent, useCallback, useEffect, useState, useMemo } from "react";
import { Wine } from "./../../data/wines/Wine";
import FilteredWinesComponent from "./FilteredWinesComponent";
import { WineContext } from "./wines-dropdown-context/wineContext/WineContext";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [query, setQuery] = useState("");

    const getWines = useCallback(async () => {
        try {
            const res = await fetch(winesUrl);
            if (!res.ok) throw new Error("The data is not valid!");
            const data = await res.json();
            setWines(data.body);
        } catch (error) {
            console.error("Error fetching wines:", error);
        }
    }, [winesUrl]);

    const getSelectedWine = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setQuery(e.target.value);
    }, []);

    const filteredWines = useMemo(() => {
        if (query === "All wines" || query.length === 0) {
            return wines;
        } else {
            return wines.filter(wine => wine.name.includes(query));
        }
    }, [query, wines]);

    const onDeleteAWine = useCallback((deleteWine: Wine) => {
        setWines(prevWines => prevWines.filter(wine => wine.name !== deleteWine.name));
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
                    <WineContext.Provider value={wines, setWines}>
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
