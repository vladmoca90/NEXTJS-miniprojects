import { Food } from "../../data/foodList/Food";

export interface FoodCalculusProps {
    foods: Food
}

export default function FoodCalculusComponent(props: FoodCalculusProps) {
    const { foods } = props;

    return (
        <div className="container-calculus">
            <table className="min-w-full border text-center text-sm font-medium">
                <thead className="border-b font-medium">
                    <tr>
                        <th scope="col" className="border-r px-6 py-4">Total amount to pay (&pound;)</th>
                        <th scope="col" className="border-r px-6 py-4">Total number of items</th>
                        <th scope="col" className="border-r px-6 py-4">Average price of items (&pound;)</th>
                        <th scope="col" className="border-r px-6 py-4">Cheapest item (&pound;)</th>
                        <th scope="col" className="border-r px-6 py-4">Most expensive item (&pound;)</th>
                        <th scope="col" className="border-r px-6 py-4">Most common unit</th>
                    </tr>
                </thead>
                <tbody className="table-content table-content-calculus">
                    <tr className="border-b dark:border-neutral-500">
                        <td className="border-r whitespace-nowrap px-6 py-4">&pound;{calculateTotalPrice().toFixed(2)}</td>
                        <td className="border-r whitespace-nowrap px-6 py-4">{props.foods.length}</td>
                        <td className="border-r whitespace-nowrap px-6 py-4">&pound;{calculateAveragePrice().toFixed(2)}</td>
                        <td className="border-r whitespace-nowrap px-6 py-4">&pound;{getCheapestItem()}</td>
                        <td className="border-r whitespace-nowrap px-6 py-4">&pound;{getMostExpensiveItem()}</td>
                        <td className="border-r whitespace-nowrap px-6 py-4">{getMostCommonUnit()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}