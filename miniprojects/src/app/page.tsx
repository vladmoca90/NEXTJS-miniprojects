"use client";
import "./styles/transactions.css";
import { Transaction } from "./../../lib/transactions/Transaction";
import { MouseEvent, useCallback, useEffect, useState } from "react";

export default function Transactions() {
    let transactionsUrl = "http://localhost:3000/api/transactions";

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);

    const getTransaction = useCallback(async () => {
        const res = await fetch(transactionsUrl);

        if (!res.ok) {
            throw new Error("The details are NOT valid!");
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();

        setTransactions(data.body);
    }, [transactionsUrl]);

    const getSelectedTransactions = useCallback(async (event: MouseEvent<HTMLDivElement>) => {
        const value = event.currentTarget.innerHTML;

        console.log(value);

        let getValue: [] | any = transactions.filter((transaction) => {
            return value === transaction.name;
        });

        console.log([].concat(getValue));

        const oneTransaction: Transaction[] = [].concat(getValue);

        setSelectedTransactions(oneTransaction);
    }, [transactions]);

    useEffect(() => {
        getTransaction();
    }, [getTransaction]);

    return (
        <div id="transaction-container">
            <span>{"SELECTED_CATEGORY"}</span>
            <div className="transactions-results">
                {
                    selectedTransactions.map((selectedTransaction, index) => {
                        return (
                            <div key={index}>
                                <p>{selectedTransaction.name}</p>
                                <p>{selectedTransaction.date}</p>
                                <p>{selectedTransaction.category}</p>
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