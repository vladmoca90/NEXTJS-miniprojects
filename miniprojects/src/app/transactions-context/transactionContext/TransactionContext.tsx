import { createContext } from "react";
import { Transaction } from "../../../../data/transactions/Transaction";

export const TransactionContext = createContext<Transaction[]>([]);