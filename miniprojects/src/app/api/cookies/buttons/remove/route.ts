"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const removeCookie = cookies().delete("name");

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