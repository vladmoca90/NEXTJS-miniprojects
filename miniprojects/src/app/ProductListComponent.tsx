import Image from "next/image";
import Link from "next/link";
import { Product } from "../../data/shop/Product";

export interface ProductProps {
    product: Product;
}

export default function ProductListComponent(props: ProductProps) {
    const { product, setProduct } = props;

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
                    <button>+</button>
                    <span className="shop-product-number"></span>
                    <button>-</button>
                </div>
            </div>
        </div>
    );
}