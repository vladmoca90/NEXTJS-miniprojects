"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const btnCookie = cookies().set("name", "VladMocanu", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        path: "/",
    });

    const btnCookieVal = cookies().get("name")?.value;

    return NextResponse.json(
        {
            btnCookie,
            btnCookieVal,
            cookies: request.cookies.getAll(),
            success: true,
        },
        {
            status: 200,
        }
    );
}