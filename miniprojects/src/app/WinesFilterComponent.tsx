"use client";
import { useCallback } from "react";
import { WineCategory } from "../../lib/wines/WineCategory";

export const WinesFilterComponent = () => {

    return (
        <div>
            <select id="productsList" title="wines">
                <option value="All products">All products</option>
            </select>
        </div>
    );
}