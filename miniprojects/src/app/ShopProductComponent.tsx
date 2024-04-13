import Image from "next/image";
import Link from "next/link";
import { Product } from "../../data/shop-products/Product";

export interface ProductProps {
    counter: number;
    product: Product;
}

export default function ProductListComponent(props: ProductProps) {
    const { product, setProduct } = props;
    const { counter, onCounter } = props;

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
                    <button id="buttonAdd">+</button>
                    <span className="shop-product-number">{counter}</span>
                    <button id="buttonRemove">-</button>
                </div>
            </div>
        </div>
    );
}