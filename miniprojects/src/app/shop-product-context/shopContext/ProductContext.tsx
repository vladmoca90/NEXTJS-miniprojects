import { createContext, useContext } from "react";
import { Product } from "../../../../data/shop-products/Product";

export const ProductContext = createContext<Product>({} as any);

export function useProductContext() {
    const product = useContext(ProductContext);

    if (product === undefined) {
        throw new Error("The product cannot be undefined!");
    }

    return product;
}