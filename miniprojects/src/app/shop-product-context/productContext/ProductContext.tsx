import { createContext, useContext } from "react";
import { Product } from "../../../../data/shop-products/Product";

export const ProductContext = createContext<Product[]>([]);

export function UsedProductContext() {
    const usedProduct = useContext(ProductContext);

    if (usedProduct === undefined) {
        throw new Error("The product cannot be undefined!");
    }

    return usedProduct;
}