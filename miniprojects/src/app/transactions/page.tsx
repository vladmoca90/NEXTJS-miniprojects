"use client";
import "./../styles/transactions.css";
import { useCallback, useEffect, useState } from "react";
import { Transaction } from "../../../lib/transactions/Transaction";

export default function Transactions() {
    let transactionsUrl = "https://csb-u0slz.vercel.app/api/transactions";

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [getTRansactions, setGetTransactions] = useState<Transaction[]>([]);

    const getTransaction = useCallback(async () => {
        const res = await fetch(transactionsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("Data is valid!");
        }

        const data = await res.json();

        setTransactions(data);
    }, [transactionsUrl]);

    const getSelectedTransaction = useCallback(() => {

    }, []);

    useEffect(() => {
        getTransaction();
    }, [getTransaction]);

    return (
        <div id="transaction-container">
            <span>{"SELECTED_CATEGORY"}</span>
            {
                transactions.map((transaction, index) => (
                    <div className="transactions-content" onClick={getSelectedTransaction} key={index}>
                        <span className="transaction-date">
                            {new Date(transaction.date).toLocaleString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                        <span className="transaction-name">{transaction.name}</span>
                        <span>£{Math.abs(transaction.amount)}</span>
                    </div>
                ))
            }
        </div>
    );
}