"use client";
import "./styles/shop-product.css";
import { Product } from "../../data/shop-products/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ShopProductComponent from "./ShopProductComponent";
import BasketComponent from "bask";

export default function ShopList() {
    const shopUrl = "http://localhost:3000/api/shop-products";

    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState<string>("Any Product");
    const [productTotal, setProductTotal] = useState<number>(0);

    // Fetch products
    const getProducts = useCallback(async () => {
        try {
            const res = await fetch(shopUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();

            // Ensure body exists
            if (data?.body) {
                setProducts(data.body);
            } else {
                setProducts([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [shopUrl]);

    // Dropdown selection
    const getSelectedProduct = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            setQuery(e.target.value);
        },
        []
    );

    // Filter products
    const filteredProducts = products.filter(
        (shop) => query === "Any Product" || shop.name.includes(query)
    );

    // Basket handlers
    const addProductsToBasket = useCallback(() => {
        setProductTotal((prev) => prev + 1);
    }, []);

    const removeProductsFromBasket = useCallback(() => {
        setProductTotal((prev) => Math.max(0, prev - 1));
    }, []);

    // Load products
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

                    {products.map((shop, index) => (
                        <option key={shop.id ?? index} value={shop.name}>
                            {shop.name}
                        </option>
                    ))}
                </select>

                <BasketComponent total={productTotal} />
            </div>

            <div className="shop-list">
                {filteredProducts.map((shop, index) => (
                    <ShopProductComponent
                        key={shop.id ?? index}
                        product={shop}
                        onCountUpdatedAdd={addProductsToBasket}
                        onCountUpdatedRemove={removeProductsFromBasket}
                    />
                ))}
            </div>
        </section>
    );
}