import { useProductContext } from "./shop-product-context/shopContext/ProductContext";

export default function BasketComponent() {
    const useProduct = useProductContext();

    return (
        <p className="total-products">Total number of products is: {useProduct.total}</p>
    );
}