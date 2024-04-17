import { createContext, useContext } from "react";
import { Transaction } from "../../../../data/transactions/Transaction";

export const TransactionContext = createContext<Transaction | undefined>(undefined);

export function useTransactionContext() {
    const useTransaction = useContext(TransactionContext);

    if (useTransaction === undefined) {
        throw new Error("The transaction context cannot be undefined!");
    }

    return useTransaction;
}