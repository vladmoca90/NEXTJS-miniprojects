import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { allAppointments } from "../../../../lib/appointment/allAppointments";

export async function GET(request: NextRequest) {
    const data = await request.json();

    const appointment = allAppointments.find((appointment) => appointment.firstName === data.firstName && appointment.lastName === data.lastName);

    if (appointment === null) {
        return NextResponse.json({},
            {
                status: 404
            },
        );
    } else {
        return NextResponse.json(
            {
                body: appointment,
                path: request.nextUrl.pathname,
                query: request.nextUrl.search,
                cookies: request.cookies.getAll(),
            },
            {
                status: 200
            },
        );
    }

}

// http://localhost:3000/api/appointment