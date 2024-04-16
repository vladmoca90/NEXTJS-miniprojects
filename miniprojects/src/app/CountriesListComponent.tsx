import Link from "next/link";
import { Country } from "../../data/countries/Country";

export interface CountriesProps {
    country: Country;
}

export default function CountriesListComponent(props: CountriesProps) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>
                <Link href={{
                    pathname: "/country-name",
                    query: {
                        "countryName": props.country.name,
                    },
                }}>{props.country.name}</Link>
            </td>
            <td>{props.country.code}</td>
        </tr>
    );
}