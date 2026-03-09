export interface BasketProps {
    totalPrice: number;
}

export default function BasketComponent({ totalPrice }: BasketProps) {
    return (
        <p className="total-products">
            Total price of products in basket: £{totalPrice.toFixed(2)}
        </p>
    );
}