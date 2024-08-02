import { Country } from "../../data/countriesList/countryList";

export interface countriesListProps {
    country: Country;
}

export function CountriesListComponent(props: countriesListProps) {
    const { country } = props;

    return (
        <ul>
            <li key={props.country.index}>{props.country.name.common}</li>
        </ul>
    )
}