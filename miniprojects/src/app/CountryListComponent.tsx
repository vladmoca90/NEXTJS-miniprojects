import Link from "next/link";
import { useCountryContext } from "./countries/countriesContext/CountryContext";

export default function CountriesListComponent() {
    const useCountry = useCountryContext();

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>
                <Link href={{
                    pathname: "/country-name",
                    query: {
                        "countryName": useCountry.name,
                    },
                }}>{useCountry.name}</Link>
            </td>
            <td>{useCountry.code}</td>
        </tr>
    );
}