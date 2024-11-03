import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useState } from "react";
import { ProductContext } from "./shop-product-context/productContext/ProductContext";
import { Product } from "../../data/shop-products/Product";

export interface ProductsProps {
    product: Product;
    onCountUpdatedAdd: () => void;
    onCountUpdatedRemove: () => void;
}

export default function ProductListComponent(props: ProductsProps) {
    const products = useContext(ProductContext);
    const [counter, setCounter] = useState<number>(0);
    const { onCountUpdatedAdd, onCountUpdatedRemove } = props;

    const addProduct = useCallback(() => {
        setCounter((c) => c + 1);
        onCountUpdatedAdd();
    }, [onCountUpdatedAdd]);

    const removeProduct = useCallback(() => {
        setCounter((c) => (c > 0 ? c - 1 : 0)); // Prevent going negative
        if (counter > 0) {
            onCountUpdatedRemove();
        }
    }, [counter, onCountUpdatedRemove]);

    return (
        <div className="shop-card">
            <div className="shop-image">
                <Image width={300} height={300} src={props.product.image} alt="Product image" />
            </div>
            <div className="shop-details">
                <Link href={{
                    pathname: "/shop-product-name",
                    query: { "name": props.product.name },
                }}>
                    <p className="shop-title">{props.product.name}</p>
                </Link>
                <p className="shop-price">£{props.product.price}</p>
                <div className="shop-buttons">
                    <button id="buttonAdd" onClick={addProduct}>+</button>
                    <span className="shop-product-number">{counter}</span>
                    <button id="buttonRemove" onClick={removeProduct}>-</button>
                </div>
            </div>
        </div>
    );
}
