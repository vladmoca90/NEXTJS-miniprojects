import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allNames } from "../../../../lib/formNames/allNames";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allNames,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200
        },
    );
}

// http://localhost:3000/api/form-names