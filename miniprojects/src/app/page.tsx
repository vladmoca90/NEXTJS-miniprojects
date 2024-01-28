"use client";
import Image from "next/image";
import "./styles/wines.css";
import { useCallback, useEffect, useState } from "react";
import { Wine } from "../../lib/wines/Wine";
import Link from "next/link";

export default function WinesSell() {
    let winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);

    const getWines = useCallback(async () => {
        const res = await fetch(winesUrl);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        setWines(data.body);
    }, [winesUrl]);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
             <div>
            <select id="productsList" title="wines">
                <option value="All products">All products</option>
            </select>
        </div>
            <div className="products-container">
                {
                    wines.map((wine, index) => {
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