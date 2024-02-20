import { NextResponse, NextRequest } from "next/server";
import { allCountries } from "../../../../lib/countries/allCountries";

export async function GET(request: NextRequest) {
    const countryName = request.nextUrl.searchParams.get("countryName");

    if (countryName === null) {
        return NextResponse.json(
            {},
            {
                status: 400,
            }
        );
    }

    const country = allCountries.find((country) => {
        return countryName === country.name;
    })

    if (!country) {
        return NextResponse.json(
            {},
            {
                status: 404,
            }
        );
    } else {
        return NextResponse.json(
            {
                country,
            },
            {
                status: 200,
            }
        );
    }
}