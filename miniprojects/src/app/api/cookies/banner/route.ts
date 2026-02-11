"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const bannerCookie = cookies().set("name", "closeBanner", {
        httpOnly: true,
        expires: new Date("2025-01-04"),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });

    return NextResponse.json(
        {
            bannerCookie,
            cookies: request.cookies.getAll(),
            success: true,
        },
        {
            status: 200,
        }
    );
}