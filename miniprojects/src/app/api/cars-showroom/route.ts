import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allCars } from "../../../../lib/carsShowroom/allCars";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: allCars,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200
        },
    );
}

// http://localhost:3000/api/cars-showroom