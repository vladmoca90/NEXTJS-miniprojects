import { createContext, useContext } from "react";
import { Transaction } from "../../../../data/transactions/Transaction";

export const TransactionContext = createContext<Transaction | any>(undefined);

export function useTransactionContext() {
    const useTransaction = useContext(TransactionContext);

    return useTransaction;
}