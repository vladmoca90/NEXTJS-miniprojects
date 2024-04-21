import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useProductContext } from "./shop-product-context/shopContext/ProductContext";

export interface ProductsProps {
    onCountUpdatedAdd: () => void;
    onCountUpdatedRemove: () => void;
}

export default function ProductListComponent(props: ProductsProps) {
    const useProduct = useProductContext();

    const [counter, setCounter] = useState(0);
    const { onCountUpdatedAdd, onCountUpdatedRemove } = props;

    const addProduct = useCallback(() => {
        setCounter(c => c + 1);
        onCountUpdatedAdd();
    }, [onCountUpdatedAdd]);

    const removeProduct = useCallback(() => {
        setCounter(c => (c >= 1 ? c - 1 : 0)); // lambda function

        if (counter > 0) {
            onCountUpdatedRemove();
        }
    }, [counter, onCountUpdatedRemove]);

    return (
        <div className="shop-card">
            <div className="shop-image">
                <Image width={300} height={300} src={useProduct.image} alt="Product image" />
            </div>
            <div className="shop-details">
                <Link href={{
                    pathname: "/shop-product-name",
                    query: {
                        "name": useProduct.name,
                    }
                }}>
                    <p className="shop-title">{useProduct.name}</p>
                </Link>
                <p className="shop-price">£{useProduct.price}</p>
                <div className="shop-buttons">
                    <button id="buttonAdd" onClick={addProduct}>+</button>
                    <span className="shop-product-number">{counter}</span>
                    <button id="buttonRemove" onClick={removeProduct}>-</button>
                </div>
            </div>
        </div>
    );
}