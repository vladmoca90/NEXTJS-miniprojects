import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { Transaction } from "../../data/transactions/Transaction";

export interface TransactionProps {
    transaction: Transaction;
    onSelectedTransaction: (transaction: Transaction) => void;
    onDeletedTransaction: (transaction: Transaction) => void;
}

const close = <FontAwesomeIcon icon={faXmark} />

export default function TransactionComponent(props: TransactionProps) {
    const { transaction, onSelectedTransaction } = props;
    const { deletedTransaction, onDeletedTransaction } = props;

    const getSelectedTransaction = useCallback(() => {
        onSelectedTransaction(transaction);
    }, [onSelectedTransaction, transaction]);

    const getDeletedTransaction = useCallback(() => {
        onDeletedTransaction(deletedTransaction);
    }, [deletedTransaction, onDeletedTransaction]);

    return (
        <tr className="border-b dark:border-neutral-500" onClick={getSelectedTransaction} data-transaction={props.transaction.name}>
            <td className="whitespace-nowrap px-6 py-6">
                {
                    new Date(props.transaction.date).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                }
            </td>
            <td className="whitespace-nowrap px-6 py-6">{props.transaction.name}</td>
            <td className="whitespace-nowrap px-6 py-6">£{Math.abs(props.transaction.amount)}</td>
            <span onClick={getDeletedTransaction} className="product-close">{close}</span>
        </tr>
    );
}