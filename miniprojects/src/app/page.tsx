"use client";
import "./styles/transactions.css";
import { Transaction } from "./../../lib/transactions/Transaction";
import { useCallback, useEffect, useState } from "react";

export default function Transactions() {
    let transactionsUrl = "http://localhost:3000/api/transactions";

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [getTransactions, setGetTransactions] = useState<Transaction[]>([]);

    const getTransaction = useCallback(async () => {
        const res = await fetch(transactionsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("Data is valid!");
        }

        const data = await res.json();

        setTransactions(data.body);
    }, [transactionsUrl]);

    const getSelectedTransactions = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        const value = e.target.addEventListener.name;
        let getValue = transactions.filter((transaction) => {
            return value === transaction.name;
        });

        console.log(getValue);

        const selectedTransaction = getValue;

        setGetTransactions(selectedTransaction);
    }, [transactions]);

    useEffect(() => {
        getTransaction();
    }, [getTransaction]);

    return (
        <div id="transaction-container">
            <span>{"SELECTED_CATEGORY"}</span>
            <div className="transactions-results">
                {
                    getTransactions.map((getTransaction, index) => {
                        return (
                            <div key={index}>
                                <p>{getTransaction.name}</p>
                                <p>{getTransaction.date}</p>
                                <p>{getTransaction.category}</p>
                            </div>
                        );
                    })
                }
            </div>
            <br />
            {
                transactions.map((transaction, index) => (
                    <div onClick={getSelectedTransactions} className="transactions-content" key={index}>
                        <span className="transaction-date">
                            {
                                new Date(transaction.date).toLocaleString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                            }
                        </span>
                        <span className="transaction-name">{transaction.name}</span>
                        <span>£{Math.abs(transaction.amount)}</span>
                    </div>
                ))
            }
        </div>
    );
}