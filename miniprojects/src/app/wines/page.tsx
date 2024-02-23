"use client";
import "./styles/wines.css";
import Image from "next/image";
import Link from "next/link";
import { Wine } from "../../lib/wines/Wine";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function WinesSell() {
    let winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [results, setResults] = useState<Wine[]>([]);

    const getWines = useCallback(async () => {
        const res = await fetch(winesUrl);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        setWines(data.body);
    }, [winesUrl]);

    const getSelectedWine = useCallback(async (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === "All products" || "") {
            const searchWine = wines.filter((wine) => {
                return wine;
            });

            console.log(searchWine);
            setResults(searchWine);
        } else {
            const searchWine = wines.filter((wine) => {
                return value === wine.name;
            });

            console.log(searchWine);
            setResults(searchWine);
        }
    }, [wines]);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <div>
                <select id="productsList" title="wines" onChange={getSelectedWine}>
                    <option value="All products">All products</option>
                    {
                        wines.map((wine, index) => {
                            return (
                                <option key={index} value={wine.name}>{wine.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            <div className="products-container">
                {
                    results.map((result, index) => {
                        return (
                            <div className="product" key={index}>
                                <div className="product-description__top">
                                    <p className="product-title">{result.name}</p>
                                </div>
                                <div className="product-description__bottom">
                                    <Image alt={result.name} className="product-img" width={200} height={100} key={index} src={result.img} />
                                </div>
                                <div className="wine-link">
                                    <Link href={{
                                        pathname: "/wine-details",
                                        query: {
                                            "wineName": result.name,
                                        }
                                    }}>Check details</Link>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}