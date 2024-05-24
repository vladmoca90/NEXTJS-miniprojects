import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import { Transaction } from "../../data/transactions/Transaction";

export interface TransactionProps {
    transaction: Transaction;
    onSelectedTransaction: (transaction: Transaction) => void;
    onDeletedTransaction: (transaction: Transaction) => void;
}

const close = <FontAwesomeIcon icon={faXmark} />

export default function TransactionComponent(props: TransactionProps) {
    const { transaction, onSelectedTransaction, onDeletedTransaction } = props;

    const getSelectedTransaction = useCallback(() => {
        onSelectedTransaction(transaction);
    }, [onSelectedTransaction, transaction]);

    const getDeletedRow = useCallback(() => {
        onDeletedTransaction(transaction);
    }, [onDeletedTransaction, transaction]);

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
            <span onClick={getDeletedRow} className="close-btn">{close}</span>
        </tr>
    );
}