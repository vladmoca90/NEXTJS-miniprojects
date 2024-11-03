import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { Transaction } from "../../data/transactions/Transaction";

export interface TransactionProps {
    transaction: Transaction;
    onSelectedTransaction: (transaction: Transaction) => void;
    onDeletedTransaction: (transaction: Transaction) => void;
}

const closeIcon = <FontAwesomeIcon icon={faXmark} />;

export default function TransactionComponent({
    transaction,
    onSelectedTransaction,
    onDeletedTransaction
}: TransactionProps) {
    const handleSelectTransaction = useCallback(() => {
        onSelectedTransaction(transaction);
    }, [onSelectedTransaction, transaction]);

    const handleDeleteTransaction = useCallback(() => {
        onDeletedTransaction(transaction);
    }, [onDeletedTransaction, transaction]);

    return (
        <tr
            className="border-b dark:border-neutral-500 cursor-pointer"
            onClick={handleSelectTransaction}
            data-transaction={transaction.name}
            role="button"
            tabIndex={0}
        >
            <td className="whitespace-nowrap px-6 py-6">
                {new Date(transaction.date).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </td>
            <td className="whitespace-nowrap px-6 py-6">{transaction.name}</td>
            <td className="whitespace-nowrap px-6 py-6">£{Math.abs(transaction.amount)}</td>
            <td onClick={(e) => { e.stopPropagation(); handleDeleteTransaction(); }}>
                <span className="close-btn">{closeIcon}</span>
            </td>
        </tr>
    );
}
