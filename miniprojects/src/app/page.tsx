"use client";
import "./styles/wines.css";
import Image from "next/image";
import Link from "next/link";
import { Wine } from "../../data/wines/Wine";
import { useCallback, useEffect, useState } from "react";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [checkedWine, setCheckedWine] = useState("");

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

    const getCheckedWine = useCallback((e: { target: { value: string } }) => {
        const value = e.target.value;

        console.log(value);
        setCheckedWine(value);
    }, []);

    const filterCheckedWine = useCallback(() => {
        if (checkedWine === "All wines" || checkedWine === null) {
            return wines;
        } else {
            return wines.filter((wine) => wine.name.includes(checkedWine));
        }
    }, [checkedWine, wines]);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <div className="wines-checkboxes flex items-center">
                <div className="flex items-center px-4 py-0 border border-gray-300 rounded dark:border-gray-700">
                    <input onChange={getCheckedWine} id="bordered-checkbox-1" type="checkbox" value="All wines" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All wines</label>
                </div>
                {
                    wines.map((wine, index) => {
                        return (
                            <div className="flex items-center px-4 py-0 border border-gray-300 rounded dark:border-gray-700" key={index}>
                                <input onChange={getCheckedWine} id="bordered-checkbox-2" type="checkbox" value={wine.name} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{wine.name}</label>
                            </div>
                        );
                    })
                }
            </div>
            <div className="products-container">
                {
                    filterCheckedWine().map((wine, index) => {
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
                    })
                }
            </div>
        </section>
    );
}