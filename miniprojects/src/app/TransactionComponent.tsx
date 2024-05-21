import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { Transaction } from "../../data/transactions/Transaction";
import { useTransactionContext } from "./transactions-context/transactionContext/TransactionContext";

export interface TransactionProps {
    transaction: Transaction;
    onSelectedTransaction: (transaction: Transaction) => void;
}

const close = <FontAwesomeIcon icon={faXmark} />

export default function TransactionComponent(props: TransactionProps) {
    const { usedTransaction } = useTransactionContext();
    const { transaction, onSelectedTransaction } = props;

    const getSelectedTransaction = useCallback(() => {
        onSelectedTransaction(transaction);
    }, [onSelectedTransaction, transaction]);

    return (
        <tr className="border-b dark:border-neutral-500" data-transaction={usedTransaction.name}>
            <td onClick={getSelectedTransaction} className="whitespace-nowrap px-6 py-6">
                {
                    new Date(usedTransaction.date).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                }
            </td>
            <td onClick={getSelectedTransaction} className="whitespace-nowrap px-6 py-6">{usedTransaction.name}</td>
            <td onClick={getSelectedTransaction} className="whitespace-nowrap px-6 py-6">£{Math.abs(usedTransaction.amount)}</td>
        </tr>
    );
}