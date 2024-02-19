import "./styles/countries.css";

export default function CountriesList() {
    let countriesUrl = "http://localhost:3000/api/countries";

    return (
        <div className="countries-table">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" className="px-6 py-3">Country name</th>
                    <th scope="col" className="px-6 py-3">Country code</th>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">A</td>
                        <td className="px-6 py-4">A</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}