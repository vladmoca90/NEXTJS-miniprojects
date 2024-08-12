import { Country } from "../../data/countriesList/countryList";

export interface countriesListProps {
    country: Country;
}

export function CountriesListComponent(props: countriesListProps) {
    const { country } = props;

    return (
        <ul className="countries-list">
            <li className="list-title">
                <span className="country-name">Name</span>
                <span className="country-name">Official name</span>
                <span className="country-img">Flag</span>
                <span className="country-description">Flag description</span>
            </li>
            <li key={props.country.index}>{props.country.name.common}</li>
            <li key={props.country.index}>{props.country.name.official}</li>
            <li key={props.country.index}>{props.country.flags.png}</li>
            <li key={props.country.index}>{props.country.flags.alt}</li>
        </ul>
    )
}