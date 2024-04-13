import { useState } from "react";

export interface BasketProps {
    total: number;
}

export default function BasketComponent(props: BasketProps) {
    const total = useState(0);

    return (
        <p className="total-products">Total number of products is: {}</p>
    );
}