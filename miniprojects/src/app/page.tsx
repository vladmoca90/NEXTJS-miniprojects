"use client";
import "./styles/shop-product.css";
import { Product } from "../../data/shop-products/Product";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ShopProductComponent from "./ShopProductComponent";
import BasketComponent from "./BasketComponent";
import { ProductContext } from "./shop-product-context/shopContext/ProductContext";

// Remake the page with useContext().

// Make it with Redux.

// Add a clear basket button (all is made through context).

// Hint - with useContext, you do not use props, you put the two calculations functions into the context.

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
            return products.filter((shop) => query.includes(shop.name));
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
                        products.map((shop, index) => {
                            return (
                                <option value={shop.name} key={index}>{shop.name}</option>
                            );
                        })
                    }
                </select>
                {/* <ProductContext.Provider>
                    <BasketComponent />
                </ProductContext.Provider> */}
            </div>
            <div className="shop-list">
                {
                    filteredProducts().map((shop, index) => {
                        return (
                            <ProductContext.Provider key={index} value={shop}>
                                <ShopProductComponent key={index}
                                    onCountUpdatedAdd={addProductsToBasket}
                                    onCountUpdatedRemove={removeProductsFromBasket} />
                            </ProductContext.Provider>
                        );
                    })
                }
            </div>
        </section>
    );
}