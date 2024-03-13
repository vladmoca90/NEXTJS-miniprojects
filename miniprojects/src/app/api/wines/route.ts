import { NextResponse, NextRequest } from "next/server";
import { allWines } from "../../../../data/wines/allWines";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allWines,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200
        },
    );
}

// http://localhost:3000/api/wines