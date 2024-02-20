import { NextResponse, NextRequest } from "next/server";
import { allWines } from "../../../../lib/wines/allWines";

export async function GET(request: NextRequest) {
    const wineName = request.nextUrl.searchParams.get("wineName");

    if (wineName === null) {
        return NextResponse.json(
            {},
            {
                status: 400
            },
        );
    }

    const wine = allWines.find((wine) => {
        return wineName === wine.name;
    });

    if (!wine) {
        return NextResponse.json(
            {},
            {
                status: 404
            },
        );
    } else {
        return NextResponse.json(
            {
                wine
            },
            {
                status: 200
            },
        );
    }
}

// http://localhost:3000/api/get-wine