import { createContext, useContext } from "react";
import { Product } from "../../../../data/shop-products/Product";

export const ProductContext = createContext<Product[]>([]);