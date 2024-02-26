import { NextRequest, NextResponse } from "next/server"
import { allTransactions } from "../../../../lib/transactions/allTransactions";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allTransactions,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        }
    );
}