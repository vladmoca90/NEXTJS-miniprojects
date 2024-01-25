import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allCars } from "../../../../lib/carsShowroom/allCars";

export async function GET(request: NextRequest) {
    const carModel = request.nextUrl.searchParams.get("carModel");

    if (carModel === null) {
        return NextResponse.json(
            {},
            {
                status: 404
            }
        );
    }

    const car = allCars.find((car) => {
        return carModel === car.model;
    });

    if (!car) {
        return NextResponse.json(
            {},
            {
                status: 400
            }
        );
    } else {
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
}

// http://localhost:3000/api/get-car-model