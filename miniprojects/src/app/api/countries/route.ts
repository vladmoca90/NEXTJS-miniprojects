import { NextResponse, NextRequest } from "next/server";
import { allCountries } from "../../../../data/countries/allCountries";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allCountries,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200
        },
    );
}

// http://localhost:3000/api/countries