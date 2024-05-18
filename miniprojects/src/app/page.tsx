"use client";
import "./styles/shop-product.css";
import { Product } from "../../data/shop-products/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ProductContext, useProductContext } from "./shop-product-context/shopContext/ProductContext";
import ShopProductComponent from "./ShopProductComponent";
import BasketComponent from "./BasketComponent";

export default function ShopList() {
    const shopUrl = "http://localhost:3000/api/shop-products";

    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState("");
    const [productTotal, setProductTotal] = useState(0);

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
            return products.filter((product) => query.includes(product.name));
        }
    }, [query, products]);

    const addProductsToBasket = useCallback(() => {
        console.log(productTotal);
        setProductTotal(p => p + 1);
    }, [productTotal]);

    const removeProductsFromBasket = useCallback(() => {
        console.log(productTotal);
        setProductTotal(p => p - 1);
    }, [productTotal]);

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
                        products.map((product, index) => {
                            return (
                                <option value={product.name} key={index}>{product.name}</option>
                            );
                        })
                    }
                </select>
                <BasketComponent total={productTotal} />
            </div>
            <div className="shop-list">
                <ProductContext.Provider value={useProductContext()}>
                    {
                        filteredProducts().map((product, index) => {
                            return (
                                <ShopProductComponent key={index}
                                    onCountUpdatedAdd={addProductsToBasket}
                                    onCountUpdatedRemove={removeProductsFromBasket} />
                            );
                        })
                    }
                </ProductContext.Provider>
            </div>
        </section>
    );
}