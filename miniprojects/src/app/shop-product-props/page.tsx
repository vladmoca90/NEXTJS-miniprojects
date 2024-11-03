"use client";
import "./styles/shop-product.css";
import { Product } from "../../data/shop-products/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ShopProductComponent from "./ShopProductComponent";
import BasketComponent from "./BasketComponent";

export default function ShopList() {
    const shopUrl = "http://localhost:3000/api/shop-products";

    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState("Any Product");
    const [productTotal, setProductTotal] = useState(0);

    const getProducts = useCallback(async () => {
        try {
            const res = await fetch(shopUrl);

            if (!res.ok) {
                throw new Error("The data is not valid!");
            }

            const data = await res.json();
            setProducts(data.body);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, []);

    const getSelectedProduct = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setQuery(e.target.value);
    }, []);

    const filteredProducts = products.filter((shop) => 
        query === "Any Product" || shop.name.includes(query)
    );

    const addProductsToBasket = useCallback(() => {
        setProductTotal((prev) => prev + 1);
    }, []);

    const removeProductsFromBasket = useCallback(() => {
        setProductTotal((prev) => Math.max(0, prev - 1)); // Prevent negative totals
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
                    className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    <option value="Any Product">Any Product</option>
                    {products.map((shop) => (
                        <option value={shop.name} key={shop.id}>{shop.name}</option> // Use a unique key
                    ))}
                </select>
                <BasketComponent total={productTotal} />
            </div>
            <div className="shop-list">
                {filteredProducts.map((shop) => (
                    <ShopProductComponent 
                        key={shop.id} // Use a unique key
                        product={shop}
                        onCountUpdatedAdd={addProductsToBasket}
                        onCountUpdatedRemove={removeProductsFromBasket}
                    />
                ))}
            </div>
        </section>
    );
}
