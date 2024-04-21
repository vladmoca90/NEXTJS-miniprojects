import { Transaction } from "../../data/transactions/Transaction";

export interface SelectedTransactionProps {
    getTransaction: Transaction;
}

export default function SelectedTransactionComponent(props: SelectedTransactionProps) {
    const { getTransaction } = props;

    return (
        <div className="border-b font-medium dark:border-neutral-500">
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
                        <td className="whitespace-nowrap px-6 py-6">
                            {
                                new Date(getTransaction.date).toLocaleString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                            }
                        </td>
                        <td className="whitespace-nowrap px-6 py-6">{getTransaction.name}</td>
                        <td className="whitespace-nowrap px-6 py-6">£{Math.abs(getTransaction.amount)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}