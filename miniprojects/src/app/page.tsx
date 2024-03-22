"use client";
import "./styles/wines.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Wine } from "../../data/wines/Wine";
import WinesComponent from "./WinesComponent";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [query, setQuery] = useState("");

    const getWines = useCallback(async () => {
        const res = await fetch(winesUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setWines(data.body);
    }, [winesUrl]);

    const getSelectedWine = useCallback(async (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setQuery(value);
    }, []);

    const filteredWines = useCallback(() => {
        if (query === "All wines" || query.length === 0) {
            return wines;
        } else {
            return wines.filter(wine => wine.name.includes(query));
        }
    }, [query, wines]);

    useEffect(() => {
        getWines();
    }, [getWines]);


    return (
        <section className="box">
            <div>
                <select id="productsList" title="wines" onChange={getSelectedWine}>
                    <option value="All wines">All wines</option>
                    {
                        wines.map((wine, index) => {
                            return (
                                <option key={index} value={wine.name}>{wine.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            <div>
                <div className="products-container">
                    {
                        filteredWines().map((wine, index) => {
                            return (
                                <WinesComponent wine={wine} name={wine.name} key={index} index={index} img={wine.img} text={wine.text} />
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}