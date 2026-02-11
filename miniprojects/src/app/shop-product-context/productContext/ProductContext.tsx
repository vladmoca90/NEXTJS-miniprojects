import { createContext } from "react";
import { Product } from "../../../../data/shop-products/Product";

export const ProductContext = createContext<Product[]>([]);
