"use client";
import "./styles/transactions.css";
import { Transaction } from "./../../lib/transactions/Transaction";
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from "react";

export default function Transactions() {
    let transactionsUrl = "https://csb-u0slz.vercel.app/api/transactions";

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

        console.log(data);

        setTransactions(data);
    }, [transactionsUrl]);

    const getSelectedTransactions = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let getValue: [] | any = transactions.filter((transaction) => {
            return value === transaction.name || value === transaction.date || transaction.category;
        });

        console.log(getValue);

        setGetTransactions(getValue);
    }, [transactions]);

    useEffect(() => {
        getTransaction();
    }, [getTransaction]);

    return (
        <div id="transaction-container">
            <span>{"SELECTED_CATEGORY"}</span>
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
        </div>
    );
}