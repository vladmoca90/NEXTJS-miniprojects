import { createContext } from "react";
import { Product } from "../../../../data/shop-products/Product";

export interface ProductRepository {
    product: Product;
    onCountUpdatedAdd: () => void;
    onCountUpdatedRemove: () => void;
}