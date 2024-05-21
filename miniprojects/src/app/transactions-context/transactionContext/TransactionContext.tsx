import { createContext } from "react";

export const TransactionContext = createContext([] as any);

// export function useTransactionContext() {
//     const transactionRepository = useContext(TransactionContext);

//     if(transactionRepository === undefined) {
//         throw new Error("The context cannot be undefined");
//     }

//     return transactionRepository;
// }