import { NextResponse, NextRequest } from "next/server";
import { allFoods } from "../../../../lib/foodList/allFoods";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allFoods,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200
        },
    );
}

// http://localhost:3000/api/food-list