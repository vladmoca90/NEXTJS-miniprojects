import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allFoods } from "../../../../lib/foodList/allFoods";

export async function GET(request: NextRequest) {
    const foodName = request.nextUrl.searchParams.get("foodName");

    if (foodName === null) {
        return NextResponse.json(
            {},
            {
                status: 400,
            }
        );
    }

    const food = allFoods.find((food) => {
        return foodName === food.name;
    });

    if (!food) {
        return NextResponse.json(
            {},
            {
                status: 404,
            }
        );
    } else {
        return NextResponse.json(
            {
                food,
            },
            {
                status: 200,
            }
        );
    }
}