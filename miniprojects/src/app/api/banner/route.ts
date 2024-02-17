import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const bannerCookie = request.cookies.get("bannerCookie");

    if (bannerCookie?.value === "true") {
        return NextResponse.json({
            message: "This is the cookie banner!"
        });
    }

    const response = NextResponse.json({
        message: "My cookie banner"
    });

    response.cookies.set("bannerCookie", "true");

    return response;
}