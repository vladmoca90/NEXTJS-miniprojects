// import { createContext } from "react";
// import { Transaction } from "../../../../data/transactions/Transaction";

// export const TransactionContext = createContext<Transaction[]>([]);


// NEW VERSION //

import { createContext } from "react";
import { Transaction } from "../../../../data/transactions/Transaction";

// Define the shape of the context value
interface TransactionContextType {
    transactions: Transaction[];

    setTransactions: (transactions: Transaction[]) => void; // You can add more functions or properties as needed
}

// Create a context for managing transactions with default values
export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);
