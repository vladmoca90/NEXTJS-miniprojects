import { createContext, useContext } from "react";

export const TransactionContext = createContext({});

export function useTransactionContext() {
    const transactionRepository = useContext(TransactionContext);

    return transactionRepository;
}