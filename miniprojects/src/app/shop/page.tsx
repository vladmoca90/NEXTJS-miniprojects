"use client";
import "./styles/shop.css";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../lib/shop/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function ShopProducts() {
    const shopUrl = "http://localhost:3000/api/shop";

    const [shops, setShops] = useState<Product[]>([]);

    const getShops = useCallback(async () => {
        const res = await fetch(shopUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setShops(data.body);
    }, []);

    useEffect(() => {
        getShops();
    }, [getShops]);

    return (
        <section className="box">
            <div className="shop-search">

            </div>
            <div className="shop-list">
                {
                    shops.map((shop, index) => {
                        return (
                            <div className="shop-card" key={index}>
                            <div className="shop-image">
                                <Image src={shop.image} alt={shop.name} />
                            </div>
                            <div className="shop-details">
                                <p className="shop-title">{shop.name}</p>
                                <div>
        
                                </div>
                            </div>
                        </div>
                        );
                    })
                }
            </div>
        </section>
    );
}