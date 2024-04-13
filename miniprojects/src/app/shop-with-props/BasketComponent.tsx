export interface BasketProps {
    total: number;
}

export default function BasketComponent(props: BasketProps) {

    return (
        <p className="total-products">Total number of products is: {props.total}</p>
    );
}