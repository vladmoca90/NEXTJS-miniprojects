import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();

    cookieStore.delete("name");

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