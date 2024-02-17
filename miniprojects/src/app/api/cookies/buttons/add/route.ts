"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const btnCookie = cookies().set("name", "VladMocanu", {
        httpOnly: true,
        maxAge: 48 * 60 * 60,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
    });

    return NextResponse.json(
        {
            cookies: request.cookies.getAll(),
            success: true,
        },
        {
            status: 200,
        }
    );
}