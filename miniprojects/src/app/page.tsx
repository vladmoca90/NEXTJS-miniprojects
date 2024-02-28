"use client";
import "./styles/wines.css";
import Image from "next/image";
import Link from "next/link";
import { Wine } from "../../lib/wines/Wine";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);
    const [query, setQuery] = useState("");
    const [isChecked, setIsChecked] = useState(false);

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
        setQuery(value);
    }, []);

    const filterWines = useCallback(() => {
        if (query === "All products" || query.length === 0) {
            return wines;
        } else {
            return wines.filter(wine => wine.name.includes(query));
        }
    }, [query, wines]);

    const onChecked = useCallback(() => {
        if(isChecked === true) {

        } else {

        }
    }, [isChecked]);

    useEffect(() => {
        getWines();
    }, [getWines]);

    return (
        <section className="box">
            <div className="flex items-center">
                {
                    wines.map((wine, index) => {
                        return (
                            <div className="flex items-center mt-5 ml-5" key={index}>
                                <input onChange={onChecked} checked={isChecked} id="checkedCheckbox" type="checkbox" value={wine.name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{wine.name}</label>
                            </div>
                        );
                    })
                }
            </div>
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
                    filterWines().map((wine, index) => {
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