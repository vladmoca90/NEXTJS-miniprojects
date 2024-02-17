"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const formCookie = cookies().set("name", "VladFormSend", {
        maxAge: 48 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    });

    return NextResponse.json(
        {
            formCookie,
            cookies: request.cookies.getAll(),
            success: true,
        },
        {
            status: 200,
        }
    );
}