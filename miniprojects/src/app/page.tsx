"use client";
import "./styles/shop.css";
import { Product } from "../../data/shop-products/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ProductListComponent from "./ProductListComponent";

export default function ShopProducts() {
    const shopUrl = "http://localhost:3000/api/shop-products";

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
                <select onChange={getSelectedProduct} id="shopDropdown" title="Shop"
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
            <div className="shop-list">
                {
                    filteredProducts().map((shop, index) => {
                        return (
                            <ProductListComponent counter={counter} key={index} product={shop} />
                        );
                    })
                }
            </div>
        </section>
    );
}