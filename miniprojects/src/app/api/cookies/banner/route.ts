import { NextRequest, NextResponse } from "next/server";

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

    // response.cookies.set("viewedWelcomeMessage", "true", { // additional cookie options
    //     httpOnly: true,
    //     maxAge: 60 * 10,
    //     secure: true,
    // });

    return response;
}

// http://localhost:3000/api/cookies/banner