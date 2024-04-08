import { NextRequest, NextResponse } from "next/server";
import { allProducts } from "../../../../data/shop-products/allProducts";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allProducts,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        }
    );
}

// http://localhost:3000/api/shop-products