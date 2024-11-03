import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { Transaction } from "../../data/transactions/Transaction";

export interface TransactionProps {
    transaction: Transaction;
    onSelectedTransaction: (transaction: Transaction) => void;
    onDeletedTransaction: (transaction: Transaction) => void;
}

export default function TransactionComponent({ transaction, onSelectedTransaction, onDeletedTransaction }: TransactionProps) {

    const handleSelectedTransaction = useCallback(() => {
        onSelectedTransaction(transaction);
    }, [onSelectedTransaction, transaction]);

    const handleDeletedRow = useCallback(() => {
        onDeletedTransaction(transaction);
    }, [onDeletedTransaction, transaction]);

    return (
        <tr className="border-b dark:border-neutral-500" data-transaction={transaction.name}>
            <td onClick={handleSelectedTransaction} className="whitespace-nowrap px-6 py-4">
                {new Date(transaction.date).toLocaleString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                })}
            </td>
            <td onClick={handleSelectedTransaction} className="whitespace-nowrap px-6 py-4">
                {transaction.name}
            </td>
            <td onClick={handleSelectedTransaction} className="whitespace-nowrap px-6 py-4">
                £{Math.abs(transaction.amount).toFixed(2)}
            </td>
            <td onClick={handleDeletedRow}>
                <button className="close-btn" aria-label={`Delete ${transaction.name}`}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </td>
        </tr>
    );
}
