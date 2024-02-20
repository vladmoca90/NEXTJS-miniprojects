"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Country } from "../../../lib/countries/Country";

export default function CountryName({ searchParams }: {
    searchParamms: {
        "countryName": string,
    }
}) {
    let countriesUrl = "http://localhost:3000/api/countries" + searchParams.countryName;

    const [countryDetails, setCountryDetails] = useState<Country[]>([] as any);
}