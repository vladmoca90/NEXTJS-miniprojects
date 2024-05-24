"use client";
import "./styles/transactions.css";
import { Transaction } from "./../../data/transactions/Transaction";
import { useCallback, useEffect, useState } from "react";
import TransactionComponent from "./TransactionComponent";
import SelectedTransactionComponent from "./SelectedTransactionComponent";
import { TransactionContext } from "./transactions-context/transactionContext/TransactionContext";

export default function Transactions() {
    let transactionsUrl = "http://localhost:3000/api/transactions";

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [getTransactions, setGetTransactions] = useState<Transaction[]>([]);

    const getTransactionsData = useCallback(async () => {
        const res = await fetch(transactionsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setTransactions(data.body);
    }, [transactionsUrl]);

    const onSelectedTransaction = useCallback((clickedTransaction: Transaction) => {
        const selectedTransaction = transactions.filter((transaction, index) => clickedTransaction.id - 1 === index);

        setGetTransactions(selectedTransaction);
    }, [transactions]);

    const onDeletedTransaction = useCallback((removedTransaction: Transaction) => {
        const chosenTransaction = transactions.filter((transaction) => removedTransaction.name !== transaction.name);
        
        console.log(chosenTransaction);
        setTransactions(chosenTransaction);
    }, [transactions]);

    useEffect(() => {
        getTransactionsData();
    }, [getTransactionsData]);

    console.log(getTransactions);

    return (
        <div id="transaction-container">
            <div className="transactions-results">
                <h3>Selected transaction</h3>
                {
                    getTransactions.map((getTransaction, index) => {
                        return (
                            <SelectedTransactionComponent getTransaction={getTransaction} key={index} />
                        );
                    })
                }
            </div>
            <br />
            <div className="flex flex-col transactions-table">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Date</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Amount</th>
                                        <th scope="col" className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TransactionContext.Provider value={transactions}>
                                        {
                                            transactions.map((transaction, index) => (
                                                <TransactionComponent
                                                    transaction={transaction}
                                                    key={index}
                                                    onSelectedTransaction={() => onSelectedTransaction(transaction)}
                                                    onDeletedTransaction={() => onDeletedTransaction(transaction)}
                                                />
                                            ))
                                        }
                                    </TransactionContext.Provider>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}