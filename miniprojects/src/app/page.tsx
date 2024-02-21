"use client";
import "./styles/wines.css";
import Image from "next/image";
import Link from "next/link";
import { Wine } from "../../lib/wines/Wine";
import { useCallback, useEffect, useState } from "react";

export default function WinesSell() {
    let winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [selectedWine, setSelectedWine] = useState(wines);

    const getWines = useCallback(async () => {
        const res = await fetch(winesUrl);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        setWines(data.body);
    }, [winesUrl]);

    const getSelectedWine = useCallback(async (e: { target: { value: string | undefined }}) => {
        const value = e.target.value;

        if (value === "All products") {
            setSelectedWine(wines);
        } else {
            const searchWine = wines.filter((wine) => { return value === wine.name; });
            setSelectedWine(searchWine);
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
                    selectedWine.map((wine, index) => {
                        return (
                            <div className="product" key={index}>
                                <div className="product-description__top">
                                    <p className="product-title">{wine.name}</p>
                                </div>
                                <div className="product-description__bottom">
                                    <Image alt={wine.name} className="product-img" width={200} height={100} key={index} src={wine.img} />
                                </div>
                                <div className="wine-link">
                                    <Link href={{
                                        pathname: "/wine-details",
                                        query: {
                                            "wineName": wine.name,
                                        }
                                    }}>Check details</Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}