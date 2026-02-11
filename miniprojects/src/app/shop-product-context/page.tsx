"use client";
import "./styles/shop-product.css";
import { Product } from "../../data/shop-products/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ProductContext } from "./shop-product-context/productContext/ProductContext";
import ProductListComponent from "./ProductListComponent";
import BasketComponent from "./BasketComponent";

export default function ShopList() {
    const shopUrl = "http://localhost:3000/api/shop-products";

    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState<string>("");
    const [productTotal, setProductTotal] = useState<number>(0);

    const getProducts = useCallback(async () => {
        const res = await fetch(shopUrl);

        if (!res.ok) {
            console.error("Failed to fetch products");
            return;
        }

        const data = await res.json();
        setProducts(data.body);
    }, [shopUrl]);

    const getSelectedProduct = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setQuery(e.target.value);
    }, []);

    const filteredProducts = useCallback(() => {
        return query === "Any Product" || query.length === 0
            ? products
            : products.filter((product) => product.name.includes(query));
    }, [query, products]);

    const addProductsToBasket = useCallback(() => {
        setProductTotal((prev) => prev + 1);
    }, []);

    const removeProductsFromBasket = useCallback(() => {
        setProductTotal((prev) => (prev > 0 ? prev - 1 : 0)); // Ensure total doesn't go negative
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <section className="box">
            <div className="shop-dropdown">
                <select onChange={getSelectedProduct} id="shopDropdown" title="Shop"
                    className="peer h-full p-2 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    <option value="Any Product">Any Product</option>
                    {products.map((product, index) => (
                        <option value={product.name} key={index}>{product.name}</option>
                    ))}
                </select>
                <BasketComponent total={productTotal} />
            </div>
            <div className="shop-list">
                <ProductContext.Provider value={products}>
                    {filteredProducts().map((product, index) => (
                        <ProductListComponent
                            product={product} 
                            key={index}
                            onCountUpdatedAdd={addProductsToBasket}
                            onCountUpdatedRemove={removeProductsFromBasket} 
                        />
                    ))}
                </ProductContext.Provider>
            </div>
        </section>
    );
}
