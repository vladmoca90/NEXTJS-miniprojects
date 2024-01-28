"use client";
import Image from "next/image";
import "./../styles/wines.css";
import { useCallback, useEffect, useState } from "react";
import { Wine } from "../../../lib/wines/Wine";

export default function WineDetails({ searchParams }: {
    searchParams: {
        "wineName": string,
    }
}) {
    let wineNameUrl = "http://localhost:3000/api/get-wine" + searchParams.wineName;

    const [wine, setWineName] = useState<Wine>([] as any);

    const getWineName = useCallback(async () => {
        const res = await fetch(wineNameUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.log("The details are NOT valid!");
            return;
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setWineName(data.wine);
    }, [wineNameUrl]);

    useEffect(() => {
        getWineName();
    }, [getWineName]);

    return (
        <section className="box wine-details">
            <div className="products-container">
                <div className="product">
                    <div className="product-description__top">
                        <p className="product-title">{searchParams.wineName}</p>
                    </div>
                    <div className="product-description__bottom">
                        <Image alt={searchParams.wineName} className="product-img" width={200} height={100} src={wine.img} />
                    </div>
                </div>
            </div>
        </section>
    );
}