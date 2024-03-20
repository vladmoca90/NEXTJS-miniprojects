// import { Transaction } from "../../data/transactions/Transaction";

// export interface TransactionsProps {
//     transaction: {}
// }

// export default function Transactions(TransactionsProps: Transaction) {
//     return (
//         {
//             transactions.map((transaction, index) => (
//                 <tr className="border-b dark:border-neutral-500" onClick={getSelectedTransactions} key={index} data-transaction={index}>
//                     <td className="whitespace-nowrap px-6 py-4">
//                         {
//                             new Date(transaction.date).toLocaleString([], {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                             })
//                         }
//                     </td>
//                     <td className="whitespace-nowrap px-6 py-4">{transaction.name}</td>
//                     <td className="whitespace-nowrap px-6 py-4">£{Math.abs(transaction.amount)}</td>
//                 </tr>
//             ))
//         }
//     );
// }