"use server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const btnCookie = cookies().set("name", "VladMocanu", {
        maxAge: 48 * 60 * 60,
    });

    const btnCookieVal = cookies().get("name")?.value;

    return NextResponse.json(
        {
            btnCookie,
            btnCookieVal,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        }
    );
}