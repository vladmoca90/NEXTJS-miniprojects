"use client";
import Image from "next/image";
import "./styles/wines.css";
import { useCallback, useEffect, useState } from "react";
import { WinesFilterComponent } from "./WinesFilterComponent";
import { Wine } from "../../lib/wines/Wine";
import { WineCategory } from "../../lib/wines/WineCategory";

export default function WinesSell() {
    let winesUrl = "http://localhost:3000/api/wines";

    const [originalWines] = useState<Wine[]>([]);
    const [wines, setWines] = useState<Wine[]>([]);
    const [categories] = useState<WineCategory[]>(Array.from(new Set(wines.map((wine) => wine.category))));

    const getWines = useCallback(async () => {
        const res = await fetch(winesUrl);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        setWines(data.body);
    }, [winesUrl]);

    const whenWineIsSelected = useCallback((category: WineCategory | undefined) => {
        if (category === undefined) {
            setWines(originalWines);
        } else {
            const filteredWines = originalWines.filter(w => w.category === category);
            setWines(filteredWines);
        }
    }, [originalWines]);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <WinesFilterComponent categories={categories} onWineSelected={whenWineIsSelected} />
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
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}