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
        <tr className="border-b dark:border-neutral-500" onClick={getSelectedTransaction} data-transaction={props.transaction.name}>
            <td className="whitespace-nowrap px-6 py-4">
                {
                    new Date(props.transaction.date).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                }
            </td>
            <td className="whitespace-nowrap px-6 py-4">{props.transaction.name}</td>
            <td className="whitespace-nowrap px-6 py-4">£{Math.abs(props.transaction.amount)}</td>
        </tr>
    );
}