import { NextRequest, NextResponse } from "next/server";
import { allWidgets } from "../../../../lib/product-widgets/allWidgets";

export function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allWidgets,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        }
    );
}