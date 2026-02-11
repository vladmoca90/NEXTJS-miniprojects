import { Transaction } from "../../data/transactions/Transaction";

export interface SelectedTransactionProps {
    getTransaction: Transaction;
}

export default function SelectedTransactionComponent({ getTransaction }: SelectedTransactionProps) {
    return (
        <div className="border-b font-medium dark:border-neutral-500">
            <div className="flex justify-between p-4">
                <div>
                    <span className="font-bold">Date:</span> 
                    {new Date(getTransaction.date).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
                <div>
                    <span className="font-bold">Name:</span> {getTransaction.name}
                </div>
                <div>
                    <span className="font-bold">Amount:</span> £{Math.abs(getTransaction.amount)}
                </div>
            </div>
        </div>
    );
}
