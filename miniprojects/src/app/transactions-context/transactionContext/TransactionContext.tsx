import { createContext } from "react";

export interface TransactionRepository {
    id?: number;
    date?: string;
    amount?: number;
    name?: string;
    category?: string;
}

export const TransactionContext = createContext<TransactionRepository>({});