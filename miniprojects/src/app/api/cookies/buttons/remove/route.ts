"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const removeCookie = cookies().set("name", "VladMocanu", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date("2025-01-15"),
        sameSite: "strict",
        path: "/",
    });

    return NextResponse.json(
        {
            removeCookie,
            cookies: request.cookies.getAll(),
            success: true,
        },
        {
            status: 200,
        }
    );
}