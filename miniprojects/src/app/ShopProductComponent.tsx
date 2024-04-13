import Image from "next/image";
import Link from "next/link";
import { Product } from "../../data/shop-products/Product";
import { useCallback, useState } from "react";

export interface ProductProps {
    product: Product;
}

export default function ProductListComponent(props: ProductProps) {
    const [counter, setCounter] = useState(0);

    const addProduct = useCallback(() => {
        setCounter(c => c + 1); // c is a lambda function. c does not mean counter!
    }, []);

    const removeProduct = useCallback(() => {
        setCounter(c => (c >= 1 ? c - 1 : 0));
    }, []);

    return (
        <div className="shop-card">
            <div className="shop-image">
                <Image width={295} height={295} src={props.product.image} alt={props.product.name} />
            </div>
            <div className="shop-details">
                <Link href={{
                    pathname: "/shop-product-name",
                    query: {
                        "name": props.product.name,
                    }
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