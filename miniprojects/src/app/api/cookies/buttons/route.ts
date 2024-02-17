import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    cookies().set("name", "Vlad");

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