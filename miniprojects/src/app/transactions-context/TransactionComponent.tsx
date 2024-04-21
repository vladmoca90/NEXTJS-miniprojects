import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext } from "react";
import { TransactionContext } from "./transactions-context/transactionContext/TransactionContext";
import { Transaction } from "../../data/transactions/Transaction";

export interface TransactionProps {
    transaction: Transaction;
    onSelectedTransaction: (transaction: Transaction) => void;
}

const close = <FontAwesomeIcon icon={faXmark} />

export default function TransactionComponent() {
    const { transaction, onSelectedTransaction } = useContext(TransactionContext);
    //const { transaction, onSelectedTransaction } = props;

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