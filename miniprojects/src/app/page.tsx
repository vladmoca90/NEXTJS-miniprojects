"use client";
import "./styles/shop.css";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../data/shop/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function ShopProducts() {
    const shopUrl = "http://localhost:3000/api/shop";

    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState("");
    const [counter, setCounter] = useState(0);

    const getProducts = useCallback(async () => {
        const res = await fetch(shopUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setProducts(data.body);
    }, []);

    const getSelectedProduct = useCallback(async (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setQuery(value);
    }, []);

    const filteredProducts = useCallback(() => {
        if (query === "Any Product" || query.length === 0) {
            return products;
        } else {
            return products.filter((shop) => query.includes(shop.name));
        }
    }, [query, products]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <section className="box">
            <div className="shop-dropdown">
                <select id="shopDropdown" title="Shop" onChange={getSelectedProduct}
                    className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    <option value="Any Product">Any Product</option>
                    {
                        products.map((shop, index) => {
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
                    filteredProducts().map((shop, index) => {
                        return (
                            <div className="shop-card" key={index}>

                                <div className="shop-image">
                                    <Image width={295} height={295} src={shop.image} alt={shop.name} />
                                </div>
                                <div className="shop-details">
                                    <Link href={{
                                        pathname: "/shop-product-name",
                                        query: {
                                            "name": shop.name,
                                        }
                                    }}>
                                        <p className="shop-title">{shop.name}</p>
                                    </Link>
                                    <p className="shop-price">£{shop.price}</p>
                                    <div className="shop-buttons">
                                        <button>+</button>
                                        <span className="shop-product-number"></span>
                                        <button>-</button>
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