import { createContext, useContext } from "react";

export const TransactionContext = createContext({});

export function useTransactionContext() {
    const transactionRepository = useContext(TransactionContext);

    if(transactionRepository === undefined) {
        throw new Error("The context cannot be undefined");
    }

    return transactionRepository;
}