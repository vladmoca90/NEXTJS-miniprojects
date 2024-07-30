import { Country } from "../../../data/countries/Country";

export interface countriesListProps {
    country: Country;
}

export function CountriesListComponent(props: countriesListProps) {
    const { country } = props;

    return (
        <ul>
            <li key={index}>{props.country.code}</li>
        </ul>
    )
}