"use client";
import "./styles/shop.css";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../data/shop/Product";
import { useCallback, useEffect, useState } from "react";

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
            <div className="shop-dropdown">
                <select id="shopDropdown" title="Shop"
                    className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    <option value="product">-- Any Product --</option>
                    {
                        shops.map((shop, index) => {
                            return (
                                <option value={shop.name} key={index}>{shop.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            <div className="shop-search">
                <label className="shop-search-title">Search:</label>
                <input className="shop-search-bar" title="search" name="search" type="text" placeholder="Search..." />
            </div>
            <div className="shop-list">
                {
                    shops.map((shop, index) => {
                        return (
                            <div className="shop-card" key={index}>
                                <Link href={{
                                    pathname: "/shop-product-name",
                                    query: {
                                        "name": shop.name,
                                    }
                                }}>
                                    <div className="shop-image">
                                        <Image width={295} height={295} src={shop.image} alt={shop.name} />
                                    </div>
                                    <div className="shop-details">
                                        <p className="shop-title">{shop.name}</p>
                                        <p className="shop-price">£{shop.price}</p>
                                        <div className="shop-buttons">
                                            <button>+</button>
                                            <span className="shop-product-number"></span>
                                            <button>-</button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}