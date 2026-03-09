"use client";
import "./styles/shop-product.css";
import { Product } from "../../data/shop-products/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ShopProductComponent from "./ShopProductComponent";
import BasketComponent from "./BasketComponent";

export default function ShopList() {
    const shopUrl = "http://localhost:3000/api/shop-products";

    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState<string>("Any Product");

    // Track total price of basket
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const getProducts = useCallback(async () => {
        try {
            const res = await fetch(shopUrl);
            if (!res.ok) throw new Error("The data is not valid!");
            const data = await res.json();
            setProducts(data?.body ?? []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [shopUrl]);

    const getSelectedProduct = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setQuery(e.target.value);
    }, []);

    const filteredProducts = products.filter(
        shop => query === "Any Product" || shop.name.includes(query)
    );

    const addToBasket = useCallback((price: number) => {
        setTotalPrice(prev => prev + price);
    }, []);

    const removeFromBasket = useCallback((price: number) => {
        setTotalPrice(prev => Math.max(0, prev - price));
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <section className="box">
            <div className="shop-dropdown">
                <select
                    onChange={getSelectedProduct}
                    id="shopDropdown"
                    title="Shop"
                    className="peer h-full p-2 outline outline-0 transition-all
                    placeholder-shown:border placeholder-shown:border-blue-gray-200
                    placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900
                    focus:border-t-transparent focus:outline-0 disabled:border-0
                    disabled:bg-blue-gray-50"
                >
                    <option value="Any Product">Any Product</option>
                    {products.map((shop) => (
                        <option key={shop.id} value={shop.name}>
                            {shop.name}
                        </option>
                    ))}
                </select>

                <BasketComponent totalPrice={totalPrice} />
            </div>

            <div className="shop-list">
                {filteredProducts.map((shop) => (
                    <ShopProductComponent
                        key={shop.id}
                        product={shop}
                        onAddToBasket={addToBasket}
                        onRemoveFromBasket={removeFromBasket}
                    />
                ))}
            </div>
        </section>
    );
}