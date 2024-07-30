import { Country } from "../../../data/countries/Country";

export interface countriesListProps {
    country: Country;
}

export function CountriesListComponent(props: countriesListProps) {
    return (
        <ul>
            <li></li>
        </ul>
    )
}