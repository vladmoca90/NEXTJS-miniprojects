import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allPersons } from "../../../../lib/formNames/allPersons";

export async function POST(request: NextRequest) {
    return NextResponse.json(
        {
            body: allPersons,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200
        },
    );
}

// http://localhost:3000/api/form-persons