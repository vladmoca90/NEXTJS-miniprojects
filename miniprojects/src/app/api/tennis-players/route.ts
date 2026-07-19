import { NextRequest, NextResponse } from "next/server";
import { allTennisPlayers } from "../../../../data/tennis/allTennisData";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allTennisPlayers,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        }
    );
}

// http://localhost:3000/api/tennis-players