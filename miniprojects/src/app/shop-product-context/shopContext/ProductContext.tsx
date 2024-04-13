import { createContext } from "react";
import { Product } from "../../../../data/shop-products/Product";

export interface ProductContext {
    product?: Product;
}

export const defaultProductContext: ProductContext = {};

export const ProductRepository = createContext<ProductContext>(defaultProductContext);