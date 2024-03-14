"use client";
import "./styles/transactions.css";
import { Transaction } from "./../../data/transactions/Transaction";
import { MouseEvent, useCallback, useEffect, useState } from "react";

export default function Transactions() {
    let transactionsUrl = "http://localhost:3000/api/transactions";

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [getTransactions, setGetTransactions] = useState<Transaction[]>([]);

    const getTransaction = useCallback(async () => {
        const res = await fetch(transactionsUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setTransactions(data.body);
    }, [transactionsUrl]);

    const getSelectedTransactions = useCallback(async (event: MouseEvent<HTMLDivElement>) => {
        const value = event.currentTarget.textContent;

        console.log({
            date: value,
            name: value,
            category: value,
        });

        console.log(value);

        let getValue: [] | any = transactions.filter((transaction) => {
            return transaction.name;
        });

        console.log([].concat(getValue));

        const selectedTransaction: Transaction[] = [].concat(getValue);

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
                        <span className="transaction-price">£{Math.abs(transaction.amount)}</span>
                    </div>
                ))
            }
        </div>
    );
}