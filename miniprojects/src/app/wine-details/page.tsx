"use client";
import "./../styles/wines.css";
import Image from "next/image";
import { Wine } from "../../../lib/wines/Wine";
import { useCallback, useEffect, useState } from "react";

export default function WineDetails({ searchParams }: {
    searchParams: {
        "wineName": string,
    }
}) {
    let wineNameUrl = "http://localhost:3000/api/get-wine?wineName=" + searchParams.wineName;

    const [wineDetails, setWineDetails] = useState<Wine>([] as any);

    const getWineDetails = useCallback(async () => {
        const res = await fetch(wineNameUrl);

        if (!res.ok) {
            throw new Error("The details are NOT valid!");
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setWineDetails(data.wine);
    }, [wineNameUrl]);

    useEffect(() => {
        getWineDetails();
    }, [getWineDetails]);

    return (
        <section className="wine-details">
            <div className="products-container">
                <div className="product">
                    <div className="product-description__top">
                        <p className="product-title">{searchParams.wineName}</p>
                    </div>
                    <div className="product-description__bottom">
                        <Image alt={searchParams.wineName} className="product-img" width={200} height={100} src={wineDetails.img} />
                    </div>
                    <div className="product-description__text">
                        <p>{wineDetails.text}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}