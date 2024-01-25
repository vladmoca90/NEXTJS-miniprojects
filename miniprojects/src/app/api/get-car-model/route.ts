import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allCars } from "../../../../lib/carsShowroom/allCars";

export async function GET(request: NextRequest) {
    const carModel = request.nextUrl.searchParams.get("model");

    if (carModel === null) {
        return NextResponse.json(
            {},
            {
                status: 400
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
                status: 404
            }
        );
    } else {
        return NextResponse.json(
            {
                car
            },
            {
                status: 200
            },
        );
    }
}

// http://localhost:3000/api/get-car-model