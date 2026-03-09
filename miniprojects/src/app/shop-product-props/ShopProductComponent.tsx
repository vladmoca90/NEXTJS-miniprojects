import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../data/shop-products/Product";
import { useCallback, useState } from "react";

export interface ProductProps {
    product: Product;
    onAddToBasket: (price: number) => void;
    onRemoveFromBasket: (price: number) => void;
}

export default function ShopProductComponent(props: ProductProps) {
    const [counter, setCounter] = useState(0);
    const { product, onAddToBasket, onRemoveFromBasket } = props;

    const addProduct = useCallback(() => {
        setCounter(c => c + 1);
        onAddToBasket(product.price);
    }, [onAddToBasket, product.price]);

    const removeProduct = useCallback(() => {
        if (counter > 0) {
            setCounter(c => c - 1);
            onRemoveFromBasket(product.price);
        }
    }, [counter, onRemoveFromBasket, product.price]);

    return (
        <div className="shop-card">
            <div className="shop-image">
                <Image
                    width={300}
                    height={300}
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <div className="shop-details">
                <Link
                    href={{
                        pathname: "/shop-product-name",
                        query: { name: product.name },
                    }}
                >
                    <p className="shop-title">{product.name}</p>
                </Link>
                <p className="shop-price">£{product.price}</p>
                <div className="shop-buttons">
                    <button
                        onClick={addProduct}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                        +
                    </button>
                    <span className="shop-product-number">{counter}</span>
                    <button
                        onClick={removeProduct}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    );
}