import { createContext } from "react";
import { Transaction } from "../../../../data/transactions/Transaction";

interface TransactionContextType {
    transactions: Transaction[];

    setTransactions: (transactions: Transaction[]) => void;
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);