import { NextResponse, NextRequest } from "next/server";
import { allAirlines } from "../../../../data/airlines/allAirlines";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allAirlines,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200
        },
    );
}

// http://localhost:3000/api/airlines