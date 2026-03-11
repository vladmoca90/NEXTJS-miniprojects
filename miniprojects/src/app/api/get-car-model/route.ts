import { NextResponse, NextRequest } from "next/server";
import { allCars } from "../../../../data/cars/allCars";

export async function GET(request: NextRequest) {
    const carModel = request.nextUrl.searchParams.get("carModel");
    console.log("Received carModel:", carModel);

    if (carModel === null) {
        console.log("No carModel provided");
        return NextResponse.json({}, { status: 400 });
    }

    const car = allCars.find((car) => carModel === car.model);
    console.log("Found car:", car);

    if (!car) {
        console.log("Car not found for model:", carModel);
        return NextResponse.json({}, { status: 404 });
    } else {
        return NextResponse.json({ car }, { status: 200 });
    }
}

// http://localhost:3000/api/get-car-model