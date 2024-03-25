"use client";
import "./styles/transactions.css";
import { Transaction } from "./../../data/transactions/Transaction";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import TransactionComponent from "./TransactionComponent";

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
        const selectedTransaction: any = transactions.filter((transaction, index) => clickedTransaction.id - 1 === index);
        setGetTransactions(selectedTransaction);
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
                            <div className="border-b font-medium dark:border-neutral-500" key={index}>
                                <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Date</th>
                                            <th scope="col" className="px-6 py-4">Name</th>
                                            <th scope="col" className="px-6 py-4">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {
                                                    new Date(getTransaction.date).toLocaleString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })
                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">{getTransaction.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">£{Math.abs(getTransaction.amount)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transactions.map((transaction, index) => (
                                            <TransactionComponent transaction={transaction} key={index} onSelectedTransaction={() => onSelectedTransaction(transaction)} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}