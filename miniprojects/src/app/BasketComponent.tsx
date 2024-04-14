export interface BasketProps {
    
}

export default function BasketComponent(BasketProps) {

    return (
        <p className="total-products">Total number of products is: {props.total}</p>
    );
}