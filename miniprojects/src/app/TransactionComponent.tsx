import { useCallback } from "react";
import { Transaction } from "../../data/transactions/Transaction";

export interface TransactionProps {
    transaction: Transaction;
    onSelectedTransaction: (transaction: Transaction) => void;
}

export default function TransactionComponent(props: TransactionProps) {
    const { transaction, onSelectedTransaction } = props;

    const getSelectedTransaction = useCallback(() => {
        onSelectedTransaction(transaction);
    }, [onSelectedTransaction, transaction]);

    return (
        <tr className="border-b dark:border-neutral-500" data-transaction={transaction.name}>
            <td onClick={getSelectedTransaction} className="whitespace-nowrap px-6 py-6">
                {
                    new Date(transaction.date).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                }
            </td>
            <td onClick={getSelectedTransaction} className="whitespace-nowrap px-6 py-6">{transaction.name}</td>
            <td onClick={getSelectedTransaction} className="whitespace-nowrap px-6 py-6">£{Math.abs(transaction.amount)}</td>
        </tr>
    );
}